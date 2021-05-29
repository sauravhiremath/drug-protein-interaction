import React, { FunctionComponent } from 'react';
import { default as NextLink } from 'next/link';
import { Breadcrumbs, Page, Spacer, Text } from '@geist-ui/react';

export const Header: FunctionComponent = () => {
  return (
    <>
      <a href="/">
        <Text h1>DRUG-PROTEIN INTERACTIONS</Text>
      </a>
      <Breadcrumbs separator=">">
        <NextLink href="/">
          <Breadcrumbs.Item nextLink>Home</Breadcrumbs.Item>
        </NextLink>
        <NextLink href="/home">
          <Breadcrumbs.Item nextLink>Calculate Interactions</Breadcrumbs.Item>
        </NextLink>
      </Breadcrumbs>
      <Spacer y={1.2} />
    </>
  );
};
