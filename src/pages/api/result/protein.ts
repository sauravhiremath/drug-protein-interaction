import type { NextApiRequest, NextApiResponse } from 'next';
import consola from 'consola';

import { conn } from '../../../config';

type Data = {
  success: boolean;
  data: unknown;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id, offset } = req.query;
    const proteinId = (Array.isArray(id) ? id[0] : id).toUpperCase();
    const off = Number(Array.isArray(offset) ? offset[0] : offset || 0);

    const colsQuery = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA= 'bioDB' AND TABLE_NAME = 'tab_prot'`;
    const cols: Array<{ COLUMN_NAME: string }> = await conn.query(colsQuery);
    const colsArray = cols.flatMap(col => col.COLUMN_NAME).filter(val => val.endsWith('_IB'));

    const query = `SELECT ${colsArray.join()} FROM tab_prot WHERE PDB_ID='${proteinId}' `;
    const topColumnsData: [any] = await conn.query(query);
    const flattenedTopColumns = Object.keys(topColumnsData[0]).map(key => ({ id: key, value: topColumnsData[0][key] }));

    const topLBColumns = flattenedTopColumns.sort((prev, curr) => curr.value - prev.value).slice(0, 3);
    const topColumns = topLBColumns.flatMap(col => {
      const core = col.id.split('_')[0];
      const relatedCols = [`${core}_FS`, `${core}_IB`, `${core}_SimTar`, `${core}_SM`, `${core}_TarID`];
      return [...relatedCols];
    });

    const topCoreColumns = topLBColumns.flatMap(col => {
      const core = col.id.split('_')[0];
      return core;
    });

    const results: Array<any> = await conn.query(
      `SELECT PDB_ID, Name, Organ, Uni_ID, SimUni ${topColumns} FROM tab_prot WHERE PDB_ID = '${proteinId}' LIMIT 20 OFFSET ${off};`
    );

    const bindingDrugs = topCoreColumns.map(core => {
      return {
        drugId: core,
        FS: results[0][`${core}_FS`],
        IB: results[0][`${core}_IB`],
        SimTar: results[0][`${core}_SimTar`],
        SM: results[0][`${core}_SM`],
        TarID: results[0][`${core}_TarID`],
      };
    });

    const proteinInfo = {
      PDB_ID: results[0].PDB_ID,
      Name: results[0].Name,
      Organ: results[0].Organ,
      Uni_ID: results[0].Uni_ID,
    };

    res.json({ success: true, data: { ...proteinInfo, bindingDrugs } });
  } catch (error) {
    consola.error(error);
    res.status(500).json({
      success: false,
      data: null,
    });
  }
};
