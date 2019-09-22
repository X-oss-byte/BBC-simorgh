import React, { useContext } from 'react';
import { shape, oneOfType } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import Metadata from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import {
  optimoMetadataPropTypes,
  cpsMetadataPropTypes,
  mediaMetadataPropTypes,
} from '#models/propTypes/metadata';
import {
  optimoPromoPropTypes,
  cpsPromoPropTypes,
  mediaPromoPropTypes,
} from '#models/propTypes/promo';
import aboutTagsContent from './linkedDataAbout';

const ENGLISH_SERVICES = ['news'];

const pageTypeMetadata = {
  article: {
    schemaOrg: 'Article',
    openGraph: 'article',
  },
  frontPage: {
    schemaOrg: 'WebPage',
    openGraph: 'website',
  },
  media: {
    schemaOrg: 'RadioChannel',
    openGraph: 'website',
  },
};

/* An array of each thingLabel from tags.about & tags.mention */
const allTags = tags => {
  const { about, mentions } = tags;
  const aboutTags = about ? about.map(thing => thing.thingLabel) : [];
  const mentionTags = mentions ? mentions.map(thing => thing.thingLabel) : [];
  return aboutTags.concat(mentionTags);
};

const getTitle = promo =>
  pathOr(null, ['headlines', 'seoHeadline'], promo)
    ? pathOr(null, ['headlines', 'seoHeadline'], promo)
    : pathOr(null, ['name'], promo);

const getDescription = (metadata, promo) =>
  pathOr(null, ['summary'], promo) ||
  pathOr(null, ['headlines', 'seoHeadline'], promo) ||
  pathOr(null, ['summary'], metadata);

const getTimeTags = (timeTag, pageType) => {
  if (pageType !== 'article') {
    return null;
  }

  return new Date(timeTag).toISOString();
};

const getAppleTouchUrl = service => {
  const assetsPath = process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH || '/';
  const separatorSlash = assetsPath[assetsPath.length - 1] !== '/' ? '/' : '';

  return [
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    assetsPath,
    separatorSlash,
    service,
    '/images/icons/icon-192x192.png',
  ].join('');
};

const MetadataContainer = ({ metadata, promo }) => {
  const {
    pageType,
    platform,
    canonicalLink,
    ampLink,
    canonicalUkLink,
    ampUkLink,
    canonicalNonUkLink,
    ampNonUkLink,
  } = useContext(RequestContext);
  const {
    service,
    brandName,
    articleAuthor,
    defaultImage,
    defaultImageAltText,
    dir,
    locale,
    isoLang,
    themeColor,
    twitterCreator,
    twitterSite,
    publishingPrinciples,
    noBylinesPolicy,
    frontPageTitle,
  } = useContext(ServiceContext);
  const { id: aresArticleId } = metadata;

  if (!aresArticleId) {
    return null;
  }

  const timeFirstPublished = getTimeTags(metadata.firstPublished, pageType);
  const timeLastPublished = getTimeTags(metadata.lastPublished, pageType);

  const appleTouchIcon = getAppleTouchUrl(service);
  const isAmp = platform === 'amp';

  let alternateLinks = [];

  const alternateLinksEnglishSites = [
    {
      href: isAmp ? ampNonUkLink : canonicalNonUkLink,
      hrefLang: 'x-default',
    },
    {
      href: isAmp ? ampNonUkLink : canonicalNonUkLink,
      hrefLang: 'en',
    },
    {
      href: isAmp ? ampUkLink : canonicalUkLink,
      hrefLang: 'en-gb',
    },
  ];

  const alternateLinksWsSites = [
    {
      href: canonicalLink,
      hrefLang: isoLang,
    },
  ];

  if (ENGLISH_SERVICES.includes(service)) {
    alternateLinks = alternateLinksEnglishSites;
  } else if (isoLang) {
    alternateLinks = alternateLinksWsSites;
  }

  const iconSizes = {
    'apple-touch-icon': [
      '72x72',
      '96x96',
      '128x128',
      '144x144',
      '152x152',
      '192x192',
      '384x384',
      '512x512',
    ],
    icon: ['72x72', '96x96', '192x192'],
  };

  const title =
    pageType === 'frontPage' && frontPageTitle
      ? frontPageTitle
      : getTitle(promo);

  return (
    <>
      <LinkedData
        brandName={brandName}
        canonicalLink={canonicalNonUkLink}
        firstPublished={timeFirstPublished}
        lastUpdated={timeLastPublished}
        logoUrl={defaultImage}
        noBylinesPolicy={noBylinesPolicy}
        publishingPrinciples={publishingPrinciples}
        seoHeadline={getTitle(promo)}
        type={pathOr(null, [pageType, 'schemaOrg'], pageTypeMetadata)}
        about={aboutTagsContent(pathOr(null, ['tags', 'about'], metadata))}
      />
      <Metadata
        isAmp={isAmp}
        alternateLinks={alternateLinks}
        ampLink={ampLink}
        appleTouchIcon={appleTouchIcon}
        articleAuthor={articleAuthor}
        articleSection={pathOr(null, ['passport', 'genre'], metadata)}
        brandName={brandName}
        canonicalLink={canonicalNonUkLink}
        defaultImage={defaultImage}
        defaultImageAltText={defaultImageAltText}
        description={getDescription(metadata, promo)}
        dir={dir}
        facebookAdmin={100004154058350}
        facebookAppID={1609039196070050}
        lang={
          pathOr(null, ['passport', 'language'], metadata) ||
          pathOr(null, ['language'], metadata)
        }
        locale={locale}
        metaTags={allTags(metadata.tags)}
        themeColor={themeColor}
        timeFirstPublished={timeFirstPublished}
        timeLastPublished={timeLastPublished}
        title={title}
        twitterCreator={twitterCreator}
        twitterSite={twitterSite}
        type={pathOr(null, [pageType, 'openGraph'], pageTypeMetadata)}
        service={service}
        showArticleTags={pageType === 'article'}
        iconSizes={iconSizes}
      />
    </>
  );
};

MetadataContainer.propTypes = {
  metadata: oneOfType([
    shape(cpsMetadataPropTypes),
    shape(optimoMetadataPropTypes),
    shape(mediaMetadataPropTypes),
  ]).isRequired,
  promo: oneOfType([
    shape(cpsPromoPropTypes),
    shape(optimoPromoPropTypes),
    shape(mediaPromoPropTypes),
  ]).isRequired,
};

export default MetadataContainer;
