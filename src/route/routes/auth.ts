import router from '../router';
import { verify } from '../../models/auth';
import {Request, Response} from "express";

router.route('/auth')
    .post(async (req: Request, res: Response) => {
        const authFrom = req.body;
        const ret = await verify(authFrom);
        res.json(ret);
    })

export default router;
