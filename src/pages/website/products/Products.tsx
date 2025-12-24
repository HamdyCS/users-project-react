import React, { useEffect, useState } from "react";
import ProductDto from "../../../dtos/products/ProductDto";
import {
  deleteWithTokenAsync,
  getWithTokenAsync,
} from "../../../services/apiService";
import { useAtom } from "jotai";
import { authAtom } from "../../../atoms/authAtom";
import LoadingSpiner from "../../../components/LoadingSpiner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

interface ProductsProps {
  type: "website" | "dashboard";
}
export default function Products({ type }: ProductsProps) {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [auth, setAuth] = useAtom(authAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionDone, setIsActionDone] = useState(false);
  const [runGetProductsUseEffect, setRunGetProductsUseEffect] =
    useState<number>(0);

  //fetch products
  useEffect(() => {
    async function fetchProducts() {
      //fetch products from api
      const products = await getWithTokenAsync<ProductDto[]>(
        "product/show",
        auth?.token || ""
      );

      setProducts(products);

      setIsLoading(false);
    }

    fetchProducts();
  }, [runGetProductsUseEffect]);

  //show successe message
  useEffect(() => {
    if (!isActionDone) return;

    if (isActionDone) {
      Swal.fire({
        allowOutsideClick: true,
        icon: "success",
        animation: true,
        allowEscapeKey: true,
        showCloseButton: true,
        showCancelButton: false,
        title: "User Deleted Successfully",
      }).then(() => {
        setIsActionDone(false);
        setRunGetProductsUseEffect((prev) => prev + 1);
      });
    }
  }, [isActionDone]);

  //deleteProdcut
  async function deleteProduct(productId: number) {
    try {
      if (!auth?.token) return;

      await deleteWithTokenAsync(`product/delete/${productId}`, auth.token);

      setIsActionDone(true);
    } catch (err) {
      console.log(err);
    }
  }

  //product elements
  const productElements = products.map((product, index) => (
    <div
      key={product.id}
      className="p-5 w-[300px] rounded-md shadow-md space-y-3 hover:scale-105 transition"
    >
      <div
        className="h-[200px] bg-contain bg-no-repeat bg-center w-full"
        style={{
          backgroundImage: `url(${product.image})`,
        }}
      ></div>
      <h3 className="font-bold text-lg">{product.title}</h3>
      <p className="">{product.description}</p>

      {(type === "dashboard") && (
        <div className="p-2 flex gap-5 justify-center ">
          <Link
            className="bg-green-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 hover:scale-110 transition"
            to={`/dashboard/products/${product.id}`}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit
          </Link>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 hover:scale-110 transition"
            onClick={() => deleteProduct(product.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </div>
      )}
    </div>
  ));

  return (
    <div className="products">
      <div className="flex gap-5 justify-between ">
        {isLoading ? <LoadingSpiner /> : productElements}
      </div>
    </div>
  );
}
