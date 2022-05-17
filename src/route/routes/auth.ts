import router from '../router';
import { register, verify } from '../../models/auth';
import {Request, Response} from "express";

router.route('/auth')
    .post(async (req: Request, res: Response) => {
        const authFrom = req.body;
        const ret = await verify(authFrom);
        res.json(ret);
    })

router.route('/register')
    .post(async (req: Request, res: Response) => {
        const authFrom = req.body;
        const ret = await register(authFrom);
        res.json(ret);
    })
export default router;
