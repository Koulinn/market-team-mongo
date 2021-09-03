import express from "express";
import productMotel from "../products/schema.js";

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const productRouter = express.Router();

const saveProductsImg = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "productsImg",
  },
});

productRouter.get("/", async (req, res, next) => {
  try {
    const getPrudct = await productMotel.find();
    res.send(getPrudct);
  } catch (error) {
    next(error);
  }
});

productRouter.post(
  "/",
  multer({ storage: saveProductsImg }).single("productImg"),
  async (req, res, next) => {
    try {
      const productPost = await productMotel.create({
        ...req.body,
        imageUrl: req.file.path,
      });

      const { _id } = productPost;
      res.send(_id);
    } catch (error) {
      next(error);
    }
  }
);

export default productRouter;
