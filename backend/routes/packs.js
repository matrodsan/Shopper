import express from "express";
import { getPacks } from "../controllers/packs.js";

const router = express.Router();

router.get("/packs", getPacks);

export default router;
