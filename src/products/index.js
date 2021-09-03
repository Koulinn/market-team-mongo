import express, { query } from "express";
import productMotel from "../products/schema.js";
import q2m from "query-to-mongo";
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
    const query = q2m(req.query);
    console.log(query);
    const getProducts = await productMotel
      .find(query.criteria, query.options.fields)
      .limit(query.options.limit)
      .skip(query.options.skip)
      .sort(query.options.sort);

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

productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const deleleProduct = await productMotel.findByIdAndDelete(
      req.params.productId
    );

    if (deleleProduct) {
      res.status(204).send("Deleted");
    } else {
      res
        .status(404)
        .send(`Product with the id ${req.params.productId} not found!`);
    }
  } catch (error) {
    next(error);
  }
});
export default productRouter;
