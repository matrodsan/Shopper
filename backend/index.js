import express from "express";
import packsRoutes from "./routes/packs.js";
import productsRoutes from "./routes/products.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", packsRoutes, productsRoutes);

app.listen(8800);
