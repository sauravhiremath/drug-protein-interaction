import type { NextApiRequest, NextApiResponse } from 'next';

import { conn } from '../../config';

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { drug }: { drug: { id: string; name: string } } = req.body;

  const drugID = drug.id.toUpperCase();
  const results = conn.query('');
  res.send({ name: 'wip' });
};
