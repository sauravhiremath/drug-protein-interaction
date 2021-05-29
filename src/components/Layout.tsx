import React, { ReactNode, FunctionComponent } from 'react';
import { Page, Text, Link, Grid, Spacer } from '@geist-ui/react';
import { default as NextLink } from 'next/link';

import { Header } from './Header';

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
      <Page.Footer>
        <Grid.Container justify="center" alignItems="center">
          <Grid xs={8}>
            <Grid.Container justify="center">
              <NextLink href="/">
                <Link color>
                  <Text>Drug Protein Interactions</Text>
                </Link>
              </NextLink>
            </Grid.Container>
          </Grid>
          <Grid xs={8}>
            <Grid.Container justify="center">
              <NextLink href="/">
                <Link icon color>
                  Terms
                </Link>
              </NextLink>
            </Grid.Container>
          </Grid>
          <Grid xs={8}>
            <Grid.Container justify="center">
              <NextLink href="/">
                <Link icon color>
                  Privacy Policy
                </Link>
              </NextLink>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Page.Footer>
    </Page>
  );
};
