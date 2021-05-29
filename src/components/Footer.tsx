import React, { ReactNode, FunctionComponent } from 'react';
import { Text, Link, Grid } from '@geist-ui/react';
import { default as NextLink } from 'next/link';

type Props = {
  children?: ReactNode;
};

export const Footer: FunctionComponent<Props> = ({ children }) => {
  return (
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
  );
};
