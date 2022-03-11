import React from 'react';
import { render } from '@testing-library/react';
import { recommendationOne } from '../helpers/fixtureData';
import Promo from '.';

describe('ScrollablePromo', () => {
  it('should render a link', () => {
    const { queryByRole } = render(<Promo block={recommendationOne} />);
    expect(queryByRole('link')).toBeInTheDocument();
  });

  it('should extract and render the correct title', () => {
    const { getByText } = render(<Promo block={recommendationOne} />);
    expect(
      getByText(
        'This is a very long headline. I am creating this for a test purpose. I love creating these type of tests. I really do not know what to write.',
      ),
    ).toBeTruthy();
  });

  it('should extract and render the correct href', () => {
    const { queryByRole } = render(<Promo block={recommendationOne} />);
    expect(queryByRole('link').href).toEqual('https://www.bbc.com/mundo');
  });
});
