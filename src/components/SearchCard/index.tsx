import React, { ReactNode, FunctionComponent } from 'react';
import { Card, Grid, Link, Page } from '@geist-ui/react';

type Props = {
  title: String;
  children?: ReactNode;
};

export const SearchCard: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <Card shadow type="lite">
      <h4>{title}</h4>
      {children}
      <Card.Footer>
        <Link color target="_blank" href="https://sauravmh.com">
          Visit source code on GitHub.
        </Link>
      </Card.Footer>
    </Card>
  );
};
