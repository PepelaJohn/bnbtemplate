import mongoose from "mongoose";

export interface IAppartment extends mongoose.Document {
    name: string;
    _location: string;
    rooms: mongoose.Types.ObjectId[];
    features:string[],
    rules:string[],
    gallery: string[];
    description: string;
    amenities: string[];
    isAvailable: boolean;
   
   
  }
const AppartmentSchema = new mongoose.Schema<IAppartment>(
  {
    name: { type: String, required: true },
    _location: { type: String, required: true },
    rooms: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Room",
      default: [],
    },
    gallery: { type: [String], default: [] },
    rules:{type:[String], default:[]},
    features:{type:[String], default:[]},
    description: { type: String, required: true },
    amenities: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true },
    
  },
  { timestamps: true }
);


  
  export default mongoose.models.Apartment || mongoose.model("Apartment", AppartmentSchema);