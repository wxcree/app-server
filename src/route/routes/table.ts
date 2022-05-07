import router from '../router';
import { Request, Response } from "express";
import { ITableAdd, ITableGet, ITableMutiGet, ITableViewAdd } from '../../domain/ITable';
import { addTable, addView, getTable, getTableMutil } from '../../models/table';

router.route('/gettable')
    .post(async (req: Request, res: Response) => {
        const content:ITableGet = req.body;
        const ret = await getTable(content);
        res.json(ret);
    })

router.route('/getmutiltable')
.post(async (req: Request, res: Response) => {
    const content:ITableMutiGet = req.body;
    const ret = await getTableMutil(content);
    res.json(ret);
})

router.route('/addtable')
    .post(async (req: Request, res: Response) => {
        const content:ITableAdd = req.body;
        const ret = await addTable(content);
        res.json(ret);
    })

router.route('/savetable')
    .post(async (req: Request, res: Response) => {
        const content: ITableViewAdd = req.body;
        const ret = await addView(content);
        res.json(ret)
    })
export default router;


