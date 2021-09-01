import React, { useContext } from 'react';
import path from 'ramda/src/path';
import hasPath from 'ramda/src/hasPath';
import styled from '@emotion/styled';

import { getSansLight } from '@bbc/psammead-styles/font-styles';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

import { GridItemLarge } from '#app/components/Grid';

import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';

const Inner = styled.div`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => service && getSansLight(service)}
  background: #f6f6f6;
  color: #3a3c3e;
  text-transform: uppercase;
  margin-bottom: ${GEL_SPACING_TRPL};
  padding: ${GEL_SPACING_DBL};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} ${GEL_SPACING_QUIN};
  }
`;

const DisclaimerComponent = () => {
  const { service, script, disclaimer } = useContext(ServiceContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = hasPath(['text'], disclaimer) && enabled;

  if (!shouldShow) return null;

  return (
    <GridItemLarge data-testid="disclaimer">
      <Inner service={service} script={script}>
        {path(['text'], disclaimer)}
      </Inner>
    </GridItemLarge>
  );
};

export default DisclaimerComponent;
