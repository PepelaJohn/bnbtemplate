import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  action: string;
  entity: string;
  entityId: mongoose.Types.ObjectId;
  performedBy: mongoose.Types.ObjectId;
  metadata?: { old: any, new:any } | null;
}

const logSchema = new Schema<ILog>({
  action: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId, required: true },
  performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

export default mongoose.model<ILog>('Log', logSchema);