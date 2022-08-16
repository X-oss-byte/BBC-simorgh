import nodeLogger from '#lib/logger.node';
import {
  INCLUDE_ERROR,
  INCLUDE_FETCH_ERROR,
  INCLUDE_REQUEST_RECEIVED,
} from '#lib/logger.const';
import { SECONDARY_DATA_TIMEOUT } from '#app/lib/utilities/getFetchTimeouts';

const logger = nodeLogger(__filename);

const fetchMarkup = async (url, assetId) => {
  logger.info(INCLUDE_REQUEST_RECEIVED, {
    url,
  });
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Simorgh/ws-web-rendering',
      },
      timeout: SECONDARY_DATA_TIMEOUT,
    });
    if (res.status !== 200) {
      logger.error(INCLUDE_FETCH_ERROR, {
        status: res.status,
        url,
        assetId,
      });
      return null;
    }
    const html = await res.text();
    return html;
  } catch (error) {
    logger.error(INCLUDE_ERROR, {
      error: error.toString(),
      url,
    });
    return null;
  }
};

export default fetchMarkup;
