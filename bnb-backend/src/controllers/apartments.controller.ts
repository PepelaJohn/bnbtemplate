import { BAD_REQUEST, NO_CONTENT, NOT_FOUND, OK } from "../constants/http";
import { Apartment, IAppartment } from "../models/Appartment";
import { AppAssert } from "../utils/appAssert";
import { catchErrors } from "../utils/catchErrors";

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
    type,
    basePricePerNight,
    seasonalOverrides,
    currentSeason,
  } = req.body;

  AppAssert(
    !!name && !!_location && !!type && !!basePricePerNight,
    400,
    "Name is required"
  );

  const newApartment = new Apartment({
    name,
    _location,
    type,
    basePricePerNight,
    seasonalOverrides,
    currentSeason,
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

export const addApartmentImages = catchErrors(async (req, res):Promise<any> => {
  const { id } = req.params;
    const { imageUrls } = req.body;

    AppAssert(!!imageUrls && Array.isArray(imageUrls), BAD_REQUEST, "Image URLs are required");


    const apartment:IAppartment | null = await Apartment.findById(id)!;
    AppAssert(!!apartment, NOT_FOUND, "Apartment not found");
    
    apartment.gallery.push(...imageUrls);
    await apartment.save();

    return res.status(OK).json(apartment.gallery);
});

