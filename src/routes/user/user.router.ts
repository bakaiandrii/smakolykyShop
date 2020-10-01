import {Router} from 'express';
import {userController} from '../../controller/user';

const router = Router();

router.post('',userController.createUser);

export const userRouter = router;
