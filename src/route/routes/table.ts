import router from '../router';
import { Request, Response } from "express";
import { ITableAdd, ITableGet } from '../../domain/ITable';
import { addTable, getTable } from '../../models/table';

router.route('/gettable')
    .post(async (req: Request, res: Response) => {
        const content:ITableGet = req.body;
        const ret = await getTable(content);
        res.json(ret);
    })
router.route('/addtable')
    .post(async (req: Request, res: Response) => {
        const content:ITableAdd = req.body;
        const ret = await addTable(content);
        res.json(ret);
    })

export default router;
