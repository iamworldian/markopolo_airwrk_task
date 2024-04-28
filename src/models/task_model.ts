import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
    lowercase: true,
  },
  date: {
    type: Date,
    required: true,
    min: new Date(),
  },
  status: {
    type: String,
    required: false,
    default: 'not_started',
    enum: ['not_started', 'completed'],
  },
});

export default mongoose.model('Tasks', TaskSchema);
