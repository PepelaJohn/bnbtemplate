import { BAD_REQUEST, NO_CONTENT, NOT_FOUND, OK } from "../constants/http";
import Apartment,{  IAppartment } from "../models/Appartment";
import { AppAssert } from "../utils/appAssert";
import { catchErrors } from "../utils/catchErrors";
import  Log  from "../models/log.model";

export const getApartment = catchErrors(async (req, res): Promise<any> => {
  const { id } = req.params;

  const apartment = await Apartment.findById(id);
  AppAssert(!!apartment, NOT_FOUND, "Apartment not found");
  return res.status(OK).json(apartment);
})

export const removeApartment = catchErrors(async (req, res): Promise<any> => {
  const { id } = req.params;

  const apartment = await Apartment.findById(id);
  AppAssert(!!apartment, NOT_FOUND, "Apartment not found");

  await Apartment.findByIdAndDelete(id);
  return res.sendStatus(NO_CONTENT);
});

export const addApartment = catchErrors(async (req, res): Promise<any> => {
  const {
    name,
    _location,
   amenities,
   description,
    rules,
    features
  } = req.body;

  AppAssert(
    !!name && !!_location ,
    BAD_REQUEST,
    "Name is required"
  );

  const newApartment = new Apartment({
    name,
    _location,
    amenities,
    rules,
    features,
    description
  });

  await newApartment.save();
  return res.status(201).json(newApartment);
});

export const getApartmentsByPriceRange = catchErrors(
  async (req, res): Promise<any> => {
    const { minPrice, maxPrice } = req.query;

    AppAssert(
      !!minPrice && !!maxPrice,
      BAD_REQUEST,
      "Min price and Max price are required"
    );

    const apartments = await Apartment.find({
      basePricePerNight: { $gte: minPrice, $lte: maxPrice },
    });

    return res.status(200).json(apartments);
  }
);

export const getApartmentsByLocation = catchErrors(
  async (req, res): Promise<any> => {
    const { location } = req.query;

    AppAssert(!!location, BAD_REQUEST, "Location is required");

    const apartments = await Apartment.find({ _location: location });

    return res.status(200).json(apartments);
  }
);

export const addApartmentImages = catchErrors(async (req, res): Promise<any> => {
  const { id } = req.params;
  const files = req.files as Express.Multer.File[];

  AppAssert(files && files.length > 0, BAD_REQUEST, "No images uploaded");

  const apartment: IAppartment | null = await Apartment.findById(id);
  AppAssert(!!apartment, NOT_FOUND, "Apartment not found");

  const imageUrls = files.map((file) => file.path); // cloudinary returns the URL as file.path
  apartment.gallery.push(...imageUrls);

  await apartment.save();

  return res.status(OK).json({ gallery: apartment.gallery });
});

export const getApartments = catchErrors(async(req, res):Promise<any> =>{
  const foundApartments = await Apartment.find()
  return res.status(OK).json(foundApartments)
})

export const updateApartment = catchErrors(async (req, res): Promise<any> => {
  const { id } = req.params;
  const { name, _location, amenities, description, rules, features, gallery, isAvailable } = req.body;

  AppAssert(!!name && !!_location && description, BAD_REQUEST, "Fill in the required fields.");

  const apartment: IAppartment | null = await Apartment.findById(id);
  AppAssert(!!apartment, NOT_FOUND, "Apartment not found");

  // 🧠 Store previous values before making any changes
  const prev = {
    name: apartment.name,
    _location: apartment._location,
    description: apartment.description,
    amenities: apartment.amenities,
    rules: apartment.rules,
    features: apartment.features,
    gallery: apartment.gallery,
    isAvailable: apartment.isAvailable,
  };

  // 🔁 Update apartment fields
  apartment.name = name;
  apartment._location = _location;
  apartment.amenities = amenities;
  apartment.description = description;
  apartment.rules = rules;
  apartment.features = features;
  apartment.gallery = gallery?.length ? gallery : apartment.gallery;
  apartment.isAvailable = isAvailable !== undefined ? isAvailable : apartment.isAvailable;

  await apartment.save();

  // 🔍 Array comparison helper
  const areArraysEqual = (arr1: any[], arr2: any[]) => {
    if (!arr1 && !arr2) return true;
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;
    return JSON.stringify([...arr1].sort()) === JSON.stringify([...arr2].sort());
  };

  // 📝 Compare changes
  const changes = {
    name: prev.name !== name ? { old: prev.name, new: name } : null,
    location: prev._location !== _location ? { old: prev._location, new: _location } : null,
    description: prev.description !== description ? { old: prev.description, new: description } : null,
    amenities: !areArraysEqual(prev.amenities, amenities) ? { old: prev.amenities, new: amenities } : null,
    rules: !areArraysEqual(prev.rules, rules) ? { old: prev.rules, new: rules } : null,
    features: !areArraysEqual(prev.features, features) ? { old: prev.features, new: features } : null,
    gallery: !!gallery?.length && !areArraysEqual(prev.gallery, gallery) ? { old: prev.gallery, new: gallery } : null,
    availability: prev.isAvailable !== isAvailable ? { old: prev.isAvailable, new: isAvailable } : null,
  };

  // 🧾 Save log if anything changed
  if (Object.values(changes).some(change => change !== null)) {
    const log = new Log({
      action: "update",
      entity: "Apartment",
      entityId: apartment._id,
      performedBy: req.userId,
      metadata: changes,
    });
    await log.save();
  }

  return res.status(OK).json(apartment);
});
