import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import consola from 'consola';

import { conn, __getDirectory } from '../../config';

type Data = {
  success: boolean;
  results: unknown;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await conn.connect();

  const populate = fs.readFileSync(path.join(__getDirectory('src', 'sql'), 'pdid.sql')).toString();
  const results = await conn.query(populate);
  consola.info(results);

  res.status(200).json({
    success: true,
    results,
  });
};
