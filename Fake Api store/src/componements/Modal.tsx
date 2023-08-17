import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type FormData = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const mutation = useMutation(async (newProduct: FormData) => {
    const response = await fetch("https://btngan-data.onrender.com/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  });

  const {
    register,
    handleSubmit,
    reset,

    formState: {},
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      price: 100,
      description:
        "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.",
      category: "",
      image: "",
    },
  });

  const handleRegistration = (data: FormData) => {
    mutation.mutate(data);
    setShowModal(false);
    reset();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
      >
        <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <div className="hidden sm:block">Add </div>
        </span>
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-10 ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    className=" text-slate-500 "
                    onSubmit={handleSubmit(handleRegistration)}
                  >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Large input
                    </label>

                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      placeholder="Title"
                      {...register("title", { required: true })}
                    />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Large input
                    </label>
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("description", { required: true })}
                    />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Large input
                    </label>
                    <input
                      className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      placeholder="price"
                      {...register("price", { required: true, max: 2000 })}
                    />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Large input
                    </label>
                    <select
                      placeholder="Select a category"
                      className="bbg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("category")}
                    >
                      <option value="men's clothing ">men's clothing</option>
                      <option value="jewelery ">jewelery</option>
                      <option value="electronics  ">electronics </option>
                      <option value="women's clothing ">
                        women's clothing
                      </option>
                    </select>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Large input
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="url"
                      placeholder="url"
                      {...register("image", { required: true })}
                    />
                    <div className="md:flex-row flex  items-center flex-col justify-between p-5 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md "
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
