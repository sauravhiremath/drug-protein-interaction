import type { NextApiRequest, NextApiResponse } from 'next';
import consola from 'consola';

import { conn } from '../../../config';

type Data = {
  success: boolean;
  drugId: string;
  offset: number;
  data: unknown;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id, offset } = req.query;
  const drugId = (Array.isArray(id) ? id[0] : id).toUpperCase();
  const off = Number(Array.isArray(offset) ? offset[0] : offset || 0);
  try {
    const data: Array<any> = await conn.query(
      `SELECT PDB_ID, NAME, Organ, Uni_ID, SimUni, ${drugId}_FS, ${drugId}_IB, ${drugId}_SimTar, ${drugId}_SM, ${drugId}_TarID FROM tab_prot ORDER BY ${drugId}_IB DESC LIMIT 20 OFFSET ${off};`
    );

    res.json({ success: true, drugId, offset: off, data });
  } catch (error) {
    consola.error(error);
    res.status(500).json({
      success: false,
      drugId: drugId,
      offset: 0,
      data: null,
    });
  }
};
