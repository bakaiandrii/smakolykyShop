import {Router} from 'express';
import { checkIsEmailExistMiddleware } from '../../middleware';
import {userController} from '../../controller';

const router = Router();

router.post('', checkIsEmailExistMiddleware, userController.createUser);

export const userRouter = router;
