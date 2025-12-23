import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { authAtom } from "../../../atoms/authAtom";
import {
  getWithTokenAsync,
  postWithTokenAsync,
} from "../../../services/apiService";
import ProductDto from "../../../dtos/products/ProductDto";
import LoadingSpiner from "../../../components/LoadingSpiner";
export default function UpdateProduct() {
  const productId = useParams<string>().productId;

  const [createDone, setCreateDone] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useAtom(authAtom);

  const navigator = useNavigate();

  //get product info from product id
  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!auth?.token || !productId) return;

        const products = await getWithTokenAsync<ProductDto[]>(
          `product/showbyid/${productId}`,
          auth?.token
        );

        const product = products[0];

        //set data
        setTitle(product.title);
        setDescription(product.description);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, []);

  //show success message
  useEffect(() => {
    if (!createDone) return;

    Swal.fire({
      animation: true,
      icon: "success",
      title: `Product Updated successfully`,
      allowEscapeKey: true,
      allowOutsideClick: true,
      showCancelButton: false,
    }).then(() => navigator("/dashboard/products"));
  }, [createDone]);

  //handel submit
  async function handelSubmit() {
    //validtion form
    if (!title || title === "") {
      return;
    }
    if (!description || description === "") {
      return;
    }
    if (!imageFile || imageFile === null) {
      return;
    }

    try {
      //create form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageFile);

      //post product
      await postWithTokenAsync(`product/update/${productId}`, formData, auth?.token || "");

      setCreateDone(true);
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return (
      <div className="flex p-5 justify-center">
        <LoadingSpiner />
      </div>
    );
  }

  return (
    <div className="create-product w-full">
      <h2 className="text-2xl font-bold mb-5">Update Product</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handelSubmit();
        }}
        className="space-y-5"
      >
        <div className="flex items-center  gap-10">
          <label htmlFor="title" className="font-bold w-[100px] text-start">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="rounded-md p-1 px-3 grow"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>
        <div className="flex items-center  gap-10">
          <label
            htmlFor="description "
            className="font-bold w-[100px] text-start"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="rounded-md p-1 px-3 grow"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description || ""}
          />
        </div>
        <div className="flex items-center  gap-10">
          <label htmlFor="image" className="font-bold w-[100px] text-start">
            Image:
          </label>
          <label className="w-64 flex flex-col items-center text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white grow">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.item(0) || null)}
            />
          </label>
        </div>
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="preview"
            className="w-32 h-32 object-cover rounded-md"
          />
        )}
        <button
          type="submit"
          className="rounded-md bg-blue-500 p-2 px-5 text-white hover:scale-125 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}
