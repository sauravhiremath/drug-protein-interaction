import React, { ReactNode, FunctionComponent, FormEvent, useState } from 'react';
import { Code, Dot, Grid, Input, Link, Page, Text, Textarea } from '@geist-ui/react';
import { Router, useRouter } from 'next/router';

import { SearchCard } from './SearchCard';

type Props = {
  children?: ReactNode;
};

export const Landing: FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();
  const [drug, setDrug] = useState<string | null>(null);
  const [protein, setProtein] = useState<string | null>(null);
  const [seq, setSeq] = useState<string | null>(null);

  const handleDrugSearch = (e: FormEvent<HTMLInputElement>) => {
    console.log('submitting');
    e.preventDefault();
    router.replace(`/drug?id=${drug}`);
  };

  const handleProteinSearch = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/protein?id=${protein}`);
  };

  const handleBlastSearch = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/blast?id=${seq}`);
  };

  return (
    <Grid.Container gap={2}>
      <Grid xs={24}>
        <SearchCard
          title="Search by Drug Name"
          label="Drug name"
          placeholder="Ex. Furosemide (FUN)"
          onSubmit={handleDrugSearch}
          onChange={v => setDrug(v.target.value)}
        />
      </Grid>
      <Grid xs={24}>
        <SearchCard
          title="Search by PDB ID"
          label="Protein Databank ID"
          placeholder="Ex. 12CA_A"
          onSubmit={handleProteinSearch}
          onChange={v => setProtein(v.target.value)}
        >
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
          onSubmit={handleBlastSearch}
          onChange={v => setSeq(v.target.value)}
        />
      </Grid>
    </Grid.Container>
  );
};
