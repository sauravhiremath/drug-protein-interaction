import React, { ReactNode, FunctionComponent } from 'react';
import { Code, Dot, Grid, Input, Link, Page, Text, Textarea } from '@geist-ui/react';
import { SearchCard } from './SearchCard';

type Props = {
  children?: ReactNode;
};

export const Landing: FunctionComponent<Props> = ({ children }) => {
  return (
    <Grid.Container gap={2}>
      <Grid xs={24}>
        <SearchCard title="Search by Drug Name" label="Drug name" placeholder="Ex. Furosemide (FUN)" />
      </Grid>
      <Grid xs={24}>
        <SearchCard title="Search by PDB ID" label="Protein Databank ID" placeholder="Ex. 12CA_A">
          <Dot type="warning">
            <Text small>
              Here <Code>12CA</Code> is the PDB ID and <Code>_A</Code> is a one-character chain identifier
            </Text>
          </Dot>
        </SearchCard>
      </Grid>
      <Grid xs={24}>
        <SearchCard
          large
          title="Search by Protein Sequence (FASTA)"
          placeholder=">HSBGPG Human gene for bone gla protein (BGP)
GGCAGATTCCCCCTAGACCCGCCCGC...
...
..."
        />
      </Grid>
    </Grid.Container>
  );
};
