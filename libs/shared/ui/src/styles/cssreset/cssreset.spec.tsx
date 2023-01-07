import { render } from '@testing-library/react';

import Cssreset from './cssreset';

describe('Cssreset', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cssreset />);
    expect(baseElement).toBeTruthy();
  });
});
