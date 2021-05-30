import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import consola from 'consola';

import { conn } from '../../config';

type Data = {
  success: boolean;
  results: unknown;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await conn.connect();

  const __pagesDirectory = path.resolve(process.cwd(), 'src', 'sql');
  consola.info(__pagesDirectory);
  const populate = fs.readFileSync(path.join(__pagesDirectory, 'pdid.sql')).toString();
  const results = await conn.query(populate);
  consola.info(results);

  res.status(200).json({
    success: true,
    results,
  });
};
