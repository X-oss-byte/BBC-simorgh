import React, { useContext } from 'react';
import { array } from 'prop-types';

import {
  GEL_SPACING_DBL,
  GEL_SPACING,
  GEL_SPACING_HLF,
} from '@bbc/gel-foundations/dist/spacings';

import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/dist/breakpoints';

import Promo from './Promo';
import PromoList from './PromoList';

import { GridItemMediumNoMargin } from '#app/components/Grid';

import { ServiceContext } from '#contexts/ServiceContext';

const ScrollablePromo = ({ blocks }) => {
  const { dir } = useContext(ServiceContext);
  const isSingleItem = blocks.length === 2;

  const promoBox = `
    flex-shrink: 0;
    width: 237px;
    background-color: #ffffff;
    padding: ${GEL_SPACING_DBL};
    margin: 0;
    margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING_DBL};

    @media (min-width: 0){
      &:first-child {
        margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING};
      }

      &:last-child {
        margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING};
      }
    }

    @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}){
      &:first-child {
        margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING};
      }

      &:last-child {
        margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING};
      }
    }

    @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}){
      &:first-child {
        margin-${dir === 'ltr' ? 'left' : 'right'}: ${GEL_SPACING_DBL};
      }

      &:last-child {
        margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING};
      }
    }

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}){
      width: 178px;

      &:last-child {
        margin-${dir === 'ltr' ? 'right' : 'left'}: 0;
      }
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}){
      &:first-child {
        margin-${dir === 'ltr' ? 'left' : 'right'}: 0;
      }

      &:last-child {
        margin-${dir === 'ltr' ? 'right' : 'left'}: 0;
      }
      width: 211px;
    }
  `;

  // IF NO PROMO RETURN NULL
  return (
    <GridItemMediumNoMargin>
      {isSingleItem ? (
        <Promo block={blocks[1]} Ourstyle={promoBox} />
      ) : (
        <PromoList blocks={blocks} Ourstyle={promoBox} />
      )}
    </GridItemMediumNoMargin>
  );
};

ScrollablePromo.propTypes = {
  blocks: array.isRequired,
};

export default ScrollablePromo;
