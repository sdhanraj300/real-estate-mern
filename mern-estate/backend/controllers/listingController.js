import Listing from "../models/listingModel.js";
export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing); // 201: Created
  } catch (error) {
    next(error);
  }
};
