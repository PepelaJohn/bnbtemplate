import express from 'express';

import  {authorize} from '../middleware/authenticate';
import { getUsers } from '../controllers/admin.controller';

const router = express.Router();

router.get('/users/all',  authorize(['admin']), getUsers )


export default router;
