import {
  runCommonCrossPlatformTests,
  runMediaPlayerEmbedTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMediaPlayerEmbedTests();

  it('I can see the headline', () => {
    const headlineEl = document.querySelector('h1[id="content"]');

    expect(headlineEl).toBeInTheDocument();
    expect(headlineEl.textContent).toBeTruthy();
    expect(headlineEl.textContent).toMatchSnapshot();
  });

  it('I can see the timestamp', () => {
    const timestampEl = document.querySelector('time');

    expect(timestampEl).toBeInTheDocument();
    expect(timestampEl.textContent).toBeTruthy();
    expect(timestampEl.textContent).toMatchSnapshot();
  });

  const bulletedListItem = document.querySelector('main ul[role="list"] > li');

  if (bulletedListItem) {
    it('I can see a bulleted list item', () => {
      expect(bulletedListItem).toBeInTheDocument();
      expect(bulletedListItem.textContent).toBeTruthy();
      expect(bulletedListItem.textContent).toMatchSnapshot();
    });
  }

  const bulletedListItemWithLink = document.querySelector(
    'main ul[role="list"] > li > a',
  );

  if (bulletedListItemWithLink) {
    it('I can see a bulleted list item with link', () => {
      expect(bulletedListItemWithLink.getAttribute('href')).toMatchSnapshot(
        bulletedListItemWithLink.textContent,
      );
    });
  }

  describe(`Related Content`, () => {
    const relatedContentLinks = document.querySelectorAll(
      '[data-e2e="related-content-heading"] a',
    );

    if (relatedContentLinks) {
      relatedContentLinks.forEach(relatedContentLink => {
        const relatedContentText = relatedContentLink.textContent;
        const relatedContentUrl = relatedContentLink.getAttribute('href');

        it('should be in the document', () => {
          expect(relatedContentLink).toBeInTheDocument();
        });

        it('should contain text', () => {
          expect(relatedContentText).toBeTruthy();
        });

        it('should match text and url', () => {
          expect({
            text: relatedContentText,
            url: relatedContentUrl,
          }).toMatchSnapshot();
        });
      });
    }
  });
};
