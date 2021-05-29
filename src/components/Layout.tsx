import React, { ReactNode, FunctionComponent } from 'react';
import { Link, Page } from '@geist-ui/react';

import { Header } from './Header';
import LogoWhite from '../../public/static/vercel.svg';

type Props = {
  children?: ReactNode;
};

export const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <Page dotBackdrop>
      <Header />
      <Page.Content>{children}</Page.Content>
      <Page.Footer>
        <Link href="/">
          <LogoWhite className="w-64" />
        </Link>
        <Link target="_blank" rel="noreferrer" icon color>
          Terms
        </Link>
        <Link target="_blank" rel="noreferrer" icon color>
          Privacy Policy
        </Link>
      </Page.Footer>
    </Page>
  );
};
