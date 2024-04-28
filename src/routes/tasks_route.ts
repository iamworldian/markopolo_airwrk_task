import { Router } from 'express';

import {
  deleteTask,
  getAllTasks,
  saveTask,
} from '../Controller/task_controller';
import tryCatch from '../utils/tryCatch';

const router = Router();

// CREATE
router.post('/', tryCatch(saveTask));

// Delete
router.delete('/:id', tryCatch(deleteTask));

//  GET All
router.get('/', tryCatch(getAllTasks));

export default router;
