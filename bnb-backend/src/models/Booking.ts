import mongoose, { Document, Schema } from 'mongoose';

export type PaymentMethod = 'mpesa' | 'stripe' | 'cash';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface IBooking extends Document {
  room: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  status: BookingStatus;
  receiptCode: string;
  transactionReference?: string;
  approvedBy?: mongoose.Types.ObjectId;
  notes?: string;
}

const bookingSchema = new Schema<IBooking>({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['mpesa', 'stripe', 'cash'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  receiptCode: { type: String, required: true, unique: true },
  transactionReference: { type: String },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String }
}, { timestamps: true });

// Generate receipt code before saving
bookingSchema.pre<IBooking>('save', function(next) {
  if (!this.receiptCode) {
    this.receiptCode = `ORINA-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  }
  next();
});

export default mongoose.model<IBooking>('Booking', bookingSchema);