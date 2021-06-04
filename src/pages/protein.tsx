import React, { ReactNode, FunctionComponent, FormEvent, useState, useEffect } from 'react';
import { Grid, Input, Link, Page, Pagination, Table, Tag, Text, Textarea, Note, Spacer } from '@geist-ui/react';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { NextPageContext } from 'next';

type Props = {
  result?: any;
};

const AttachTag = (str: string, value: number) => {
  console.log(str, value);
  let type: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'dark' | 'lite' | undefined = 'success';
  if (str === 'ILBind') {
    type = value > 0.75 ? 'success' : value > 0.65 ? 'warning' : 'error';
  } else if (str === 'FindSite') {
    type = value > 0.35 ? 'warning' : 'error';
  } else if (str === 'SMAP') {
    type = value > 60 ? 'success' : value > 47 ? 'warning' : 'error';
  }
  return <Tag type={type} invert>{value}</Tag>;
};

const ProteinPage: FunctionComponent<Props> = ({ result }) => {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);
  const [proteinId, setProteinId] = useState<string | null>(null);

  useEffect(() => {
    if (result) {
      if (result.success) {
        setProteinId(result.data.PDB_ID);
        setData(() => {
          return result.data.bindingDrugs.map((val: any) => {
            return {
              ...val,
              FS: AttachTag('FindSite', Number(val.FS)),
              IB: AttachTag('ILBind', Number(val.IB)),
              SM: AttachTag('SMAP', Number(val.SM)),
            };
          });
        });
      }
    }
  }, []);

  return (
    <Layout>
      <Grid.Container gap={2}>
        <Grid xs={24}>
          <Note label={false} type="secondary">
            <Text b>More information about {setProteinId} could be found from the following sources.</Text>
            <Spacer y={0.5} />
            <Text b>PDB: </Text>
            <Link icon color href={`http://www.rcsb.org/pdb/ligand/ligandsummary.do?hetId=${setProteinId}`}>
              {`http://www.rcsb.org/pdb/ligand/ligandsummary.do?hetId=${setProteinId}`}
            </Link>
            <Spacer y={0.5} />
            <Text b>DrugBank: </Text>
            <Link icon color href={`http://www.drugbank.ca/drugs/DB00819`}>
              {`http://www.drugbank.ca/drugs/DB00819`}
            </Link>
            <Spacer y={0.5} />
            <Text b>BindingDB: </Text>
            <Link icon color href={`http://www.bindingdb.org/bind/chemsearch/marvin/MolStructure.jsp?monomerid=10880`}>
              {`http://www.bindingdb.org/bind/chemsearch/marvin/MolStructure.jsp?monomerid=10880`}
            </Link>
          </Note>
        </Grid>
        <Grid xs={24}>
          <Note label={false} type="secondary">
            <Text b>
              The table below lists all proteins from the structural human proteome that are sorted by the ILbind
              binding propensity.
            </Text>
            <Text blockquote>
              The table includes annotations of known binding events from PDB, DrugBank, and BindingDB, and binding
              propensities predicted by ILbind, SMAP, and eFindSite.
            </Text>
            <Text blockquote>
              The table sorts all proteins by their binding propensities predicted by ILbind, but they can be resorted
              by the predictions from SMAP or eFindSite by clicking on the name of predictor in the rightmost column of
              header row.
            </Text>
            <Text blockquote>
              Click protein name to get all protein-drug interactions corresponding to the selected protein.
            </Text>
          </Note>
        </Grid>
        <Grid xs={24}>
          <Table data={data}>
            {/* <Table.Column prop="PDB_ID" label="PDB ID" />
            <Table.Column prop="NAME" label="Name" width={400} />
            <Table.Column prop="Organ" label="Organism" width={100} />
            <Table.Column prop="Uni_ID" label="Uniprot ID" />
            <Table.Column prop="SimUni" label="Uni_ID" /> */}
            <Table.Column prop="drugId" label="Drug ID" />
            <Table.Column prop="SimTar" label="Sequence similarity to known target [%]" />
            <Table.Column prop="IB" label="ILbind" />
            <Table.Column prop="SM" label="SMAP" />
            <Table.Column prop="FS" label="FindSite" />
            <Table.Column prop="TarID" label="Target ID" />
          </Table>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { id } = context.query;
    const value = Array.isArray(id) ? id[0] : id;
    if (!value) {
      return {
        props: {},
      };
    }

    console.log(`http://localhost:3000/api/result/protein?id=${value}`);

    const res = await fetch(`http://localhost:3000/api/result/protein?id=${value}`);
    if (!res.ok) {
      throw Error('internal server error');
    }

    const data = await res.json();
    console.log(data);
    return {
      props: {
        result: data,
      },
    };
  } catch (error) {
    console.warn(error);
    return {
      props: {},
    };
  }
}

export default ProteinPage;
