import { useAtom } from "jotai";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authAtom } from "../../../atoms/authAtom";
import { postWithTokenAsync } from "../../../services/apiService";

interface Form {
  title: string;
  description: string;
  image: File;
}
export default function CreateProduct() {
  const [createDone, setCreateDone] = useState(false);
  const [form, setForm] = useState<Form>({} as Form);
  const [auth, setAuth] = useAtom(authAtom);

  const navigator = useNavigate();

  useEffect(() => {
    if (!createDone) return;

    Swal.fire({
      animation: true,
      icon: "success",
      title: `Product created successfully`,
      allowEscapeKey: true,
      allowOutsideClick: true,
      showCancelButton: false,
    }).then(() => navigator("/dashboard/products"));
  }, [createDone]);

  //handel submit
  async function handelSubmit() {
    console.log(form);
    //validtion form
    if (!form?.title || form?.title === "") {
      return;
    }
    if (!form.description || form.description === "") {
      return;
    }
    if (!form.image) {
      return;
    }

    try {
      //create form data
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("image", form.image);

      //post product
      await postWithTokenAsync("product/create", formData, auth?.token || "");

      setCreateDone(true);
    } catch (err) {
      console.log(err);
    }
  }

  function handelFormChange(event: ChangeEvent<HTMLInputElement>): void {
    //get values from event
    const { name, value, files } = event.target;

    //create new form object from current form
    const newForm = { ...form, [name]: value };

    //set value to form
    if (name === "image") {
      //check if files is not null
      if (files && files.length > 0) newForm.image = files[0];
    }

    setForm(newForm);
  }

  return (
    <div className="create-product w-full">
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
            onChange={handelFormChange}
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
            onChange={handelFormChange}
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
              onChange={handelFormChange}
            />
          </label>
        </div>
        {form?.image && (
          <img
            src={URL.createObjectURL(form.image)}
            alt="preview"
            className="w-32 h-32 object-cover rounded-md"
          />
        )}
        <button
          type="submit"
          className="rounded-md bg-blue-500 p-2 px-5 text-white hover:scale-125 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
}
