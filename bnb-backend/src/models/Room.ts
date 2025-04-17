import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  title: string;
  description: string;
  price: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  bookedDates: { start: Date; end: Date }[];
}

const roomSchema = new Schema<IRoom>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  images: { type: [String], default: [] },
  isAvailable: { type: Boolean, default: true },
  bookedDates: [{
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  }]
}, { timestamps: true });

export default mongoose.model<IRoom>('Room', roomSchema);