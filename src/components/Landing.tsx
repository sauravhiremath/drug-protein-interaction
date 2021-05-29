import React, { ReactNode, FunctionComponent } from 'react';
import { Link, Page } from '@geist-ui/react';

type Props = {
  children?: ReactNode;
};

export const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      Landing here <br />
    </>
  );
};
