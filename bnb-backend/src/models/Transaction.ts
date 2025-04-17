import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  booking: mongoose.Types.ObjectId;
  amount: number;
  paymentMethod: 'mpesa' | 'stripe' | 'cash';
  transactionReference: string;
  status: 'pending' | 'completed' | 'failed';
  mpesaReceiptNumber?: string;
  stripeChargeId?: string;
  processedBy?: mongoose.Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>({
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['mpesa', 'stripe', 'cash'], required: true },
  transactionReference: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  mpesaReceiptNumber: { type: String },
  stripeChargeId: { type: String },
  processedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', transactionSchema);