import axios from "axios";
import { useEffect, useState } from "react";
import "./Products.css";
import Container from "../../components/Container/Container";
import CSVReader from "react-csv-reader";
import Button from "../../components/Button/Button";
import { BsFiletypeCsv, BsCheckLg } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  const validacao = () => {
    const alterados = products.filter((produto) => {
      return produto.new_price ? true : false;
    });
    alterados.forEach((alterado) => {
      let regras = [false, false];
      if (alterado.new_price >= alterado.cost_price) {
        regras[0] = true;
      }
      if (
        alterado.new_price <= alterado.sales_price * 1.1 &&
        alterado.new_price >= alterado.sales_price * 0.9
      ) {
        regras[1] = true;
      }
      alterado.regra = regras;
    });
    console.log(alterados);
  };

  const showToastMessage = () => {
    toast.success("Tabela atualizada!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleCSVUpload = (data) => {
    const novoArray = products.map((produto) => {
      const codigo = produto.code;
      const novoPreco = data.find(
        (info) => parseInt(info[0]) === parseInt(codigo)
      );
      if (novoPreco) {
        return { ...produto, new_price: parseInt(novoPreco[1]) };
      } else {
        return produto;
      }
    });

    setProducts(novoArray);
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8800/products");
      setProducts(res.data);
      showToastMessage();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <h1 className="title">Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Cost price</th>
            <th>Sales price</th>
            <th>New price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr className="product" key={product.code}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.cost_price}</td>
                <td>{product.sales_price}</td>
                <td>{product.new_price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <label className="file" htmlFor="csv-input">
        <BsFiletypeCsv />
        Enviar arquivo
      </label>
      <CSVReader onFileLoaded={handleCSVUpload} inputId="csv-input" />
      <Button funcao={validacao}>
        <BsCheckLg />
        Validar
      </Button>
      <Button funcao={getProducts}>
        <AiOutlineClear />
        Limpar alterações
      </Button>
      <ToastContainer />
    </Container>
  );
};

export default Products;
