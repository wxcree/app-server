import router from '../router';
import { Request, Response } from "express";
import { getPkgs, pkgAdd, setPkgs } from '../../models/pkg';
import { IPkgAddFrom, IPkgGetFrom, IPkgSetFrom } from '../../domain/IDatapkg';

router.route('/getpkg')
    .post(async (req: Request, res: Response) => {
        const content:IPkgGetFrom = req.body;
        const ret = await getPkgs(content);
        res.json(ret);
    })

router.route('/setpkg')
    .post(async (req: Request, res: Response) => {
        const content:IPkgSetFrom = req.body;
        const ret = await setPkgs(content);
        res.json(ret);
    })

router.route('/addpkg')
    .post(async (req: Request, res: Response) => {
        const content:IPkgAddFrom = req.body;
        const ret = await pkgAdd(content);
        res.json(ret);
    })

export default router;
