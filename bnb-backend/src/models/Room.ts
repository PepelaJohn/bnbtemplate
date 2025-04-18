import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  title: string;
  description: string;
  price: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  
  isAvailable: boolean;
  bookedDates: { start: Date; end: Date }[];
  apartment: mongoose.Types.ObjectId;
  type: "Studio" | "1BR" | "2BR" | "Deluxe Suite";
  
  basePrice: number; // automatic base price by type
  overridePrice: number; // seasonal/admin price
  pricePerNight: number;
  images: string[];
}

const roomSchema = new Schema<IRoom>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: { type: [String], default: [] },
    
    images: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true },
    basePrice: { type: Number }, // automatic base price by type
    overridePrice: { type: Number, default: null }, // seasonal/admin price
    pricePerNight: { type: Number }, // always set to overridePrice || basePrice
    apartment: { type: Schema.Types.ObjectId, ref: "Apartment" },
    type: {
      type: String,
      enum: ["Bedsitter", "Studio", "1BR", "Deluxe Suite"],
      required: true,
    },
    bookedDates: [
      {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

const TYPE_PRICING: Record<string, number> = {
  Bedsitter: 2500,
  Studio: 4000,
  "1BR": 5500,
  "Deluxe Suite": 7000,
};

roomSchema.pre("save", function (next) {
  const doc = this as any;

  if (doc.isModified("type")) {
    doc.basePrice = TYPE_PRICING[doc.type] || 0;
  }

  doc.pricePerNight = doc.overridePrice ?? doc.basePrice;

  next();
});

export default mongoose.model<IRoom>("Room", roomSchema);
