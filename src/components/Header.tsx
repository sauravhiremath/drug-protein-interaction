import React, { FunctionComponent } from 'react';
import { Page } from '@geist-ui/react';

import Logo from '../../public/static/vercel.svg';

export const Header: FunctionComponent = () => {
  return (
    <Page.Header>
      <a href="/">
        <Logo />
      </a>
    </Page.Header>
  );
};
