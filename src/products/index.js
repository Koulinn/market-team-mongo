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
    const getProducts = await productMotel.find();
    res.send(getProducts);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:productId", async (req, res, next) => {
  try {
    const getProduct = await productMotel.findById(req.params.productId);
    if (getProduct) {
      res.status(201).send(getProduct);
    } else {
      res
        .status(401)
        .send(`Product with the id ${req.params.productId} not found`);
    }
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

productRouter.put("/:productId", async (req, res, next) => {
  try {
    const productEdited = await productMotel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );

    if (productEdited) {
      res.status(201).send(productEdited);
    } else {
      res
        .status(401)
        .send(`Product with the id ${req.params.productId} not found`);
    }
  } catch (error) {
    next(error);
  }
});

productRouter.delete("/", async (req, res, next) => {
  try {
  } catch (error) {}
});
export default productRouter;
