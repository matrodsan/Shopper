import { db } from "../db.js";

export const getPacks = (_, res) => {
  const q = "SELECT * FROM packs";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    
    return res.status(200).json(data);
  });
};
