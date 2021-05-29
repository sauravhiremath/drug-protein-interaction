import React, { FunctionComponent } from 'react';
import track from 'react-tracking';
import { NextPageContext } from 'next';

import { Layout } from '../components/Layout';
import { Landing } from '../components/Landing';

type Props = {
  result: string | null;
};

const IndexPage: FunctionComponent<Props> = ({ result }) => {
  return (
    <Layout>
      <Landing />
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext): Promise<{ props: Props }> {
  try {
    const { q } = context.query;
    const value = Array.isArray(q) ? q[0] : q;

    // if (!value) {
    //   return {
    //     props: {
    //       result: null,
    //     },
    //   };
    // }

    const finalResult = 'This is result';
    return {
      props: {
        result: finalResult,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        result: null,
      },
    };
  }
}

export default track({
  page: 'ResultPage',
})(IndexPage);
