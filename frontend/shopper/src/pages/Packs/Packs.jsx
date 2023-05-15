import axios from "axios";
import { useEffect, useState } from "react";
import "./Packs.css";

const Packs = () => {
  const [packs, setPacks] = useState([]);

  const getPacks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/packs");
      console.log(res);
      setPacks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPacks();
  }, [setPacks]);

  return (
    <div>
      {packs.map((pack) => (
        <div className="pack">
          <p>ID: {pack.id}</p>
          <p>PACK ID: {pack.pack_id}</p>
          <p>PRODUCT ID: {pack.product_id}</p>
          <p>PACK QUANTITY: {pack.qty}</p>
        </div>
      ))}
    </div>
  );
};

export default Packs;
