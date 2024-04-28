import { NextFunction, Request, Response } from 'express';
import node_schedule from 'node-schedule';
import Task_model from '../models/task_model';
import { appendFile } from '../utils/utils';

export const saveTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const task = new Task_model(req.body);
  const savedTask = await task.save();

  node_schedule.scheduleJob(task.date, async () => {
    console.log('Task Done');
    await Task_model.findOneAndUpdate(
      { _id: savedTask._id },
      { $set: { status: 'completed' } },
      { new: true },
    );
    appendFile('src/public/logger.txt', JSON.stringify(task));
  });
  return res.status(200).json(savedTask);
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await Task_model.deleteOne({ _id: req.params.id });
  return res.status(200).json({ msg: 'Task Deleted' });
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const tasks = await Task_model.find();
  return res.status(200).json(tasks);
};
