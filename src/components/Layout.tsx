import React, { ReactNode, FunctionComponent } from 'react';
import { Page, Spacer } from '@geist-ui/react';

import { Header } from './Header';
import { Footer } from './Footer';

type Props = {
  children?: ReactNode;
};

export const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <Page render="effect-seo" dotBackdrop>
      <Page.Content>
        <Header />
        {children}
      </Page.Content>
      <Spacer />
      <Page.Footer>
        <Footer />
      </Page.Footer>
    </Page>
  );
};
