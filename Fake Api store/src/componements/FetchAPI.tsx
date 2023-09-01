import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import "react-spinner-animated/dist/index.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../context/Context";
type Item = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

function FetchAPI() {
  const context = useContext(BooksContext);

  const [searchTitle, setSearchTitle] = useState("");
  const { isLoading, error, data } = useQuery<Item[]>("store", () =>
    fetch("https://btngan-data.onrender.com/products").then((res) => res.json())
  );

  // Filtering the data based on the searchTitle

  const filteredData = data?.filter((value) => {
    // If no search title is provided, return all items
    if (searchTitle === "") {
      return true;
      // If the current item's title contains the searchTitle (case-insensitive)
    } else if (value.title.toLowerCase().includes(searchTitle.toLowerCase())) {
      return true;
    }
    return false;
  });

  if (filteredData?.length === 0) {
    return (
      <div className="text-center  mx2">
        <div className="flex flex-wrap justify-center md:space-x-2">
          <div className="flex justify-end w-11/12">
            <div className="xl:w-96">
              <div className="input-group relative flex flex-wrap items-stretch">
                <input
                  type="search"
                  className="form-control relative  min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid   border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-200 focus:outline-none md:z-4 "
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="  text-2xl m-[100px]">
          No results found for your search.
        </p>
      </div>
    );
  }
  if (isLoading)
    return (
      <div className="md:space-x-2">
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 mr-2 mt-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </div>
    );

  if (error) return "An error has occurred: " + error;

  return (
    <div>
      <div className="flex flex-wrap justify-center md:space-x-2">
        <div className="flex justify-end w-11/12">
          <div className="xl:w-96">
            <div className="input-group relative flex flex-wrap items-stretch">
              <input
                type="search"
                className="form-control relative  min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid   border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-200 focus:outline-none md:z-4 "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredData?.map((item) => (
          <motion.div
            initial={{ scale: 0.7 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            key={item.id}
            className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl  hover:scale-105 duration-300 "
          >
            <Link
              to={`/store/${item.id}`}
              className="relative flex items-end overflow-hidden rounded-xl  "
            >
              <img
                className="object-contain h-48 w-96"
                src={item.image}
                alt={item.description}
              />
            </Link>

            <div className="mt-1 p-2">
              <h2 className="text-slate-700 text-ellipsis overflow-hidden h-7">
                {item.title}
              </h2>

              <div className="mt-3 flex items-end justify-between">
                <p className="text-lg font-bold  text-cyan-500">
                  ${item.price}
                </p>

                <div className="flex items-center space-x-1.5 rounded-lg bg-rose-300  px-4 py-1.5 text-white duration-100 hover:bg-red-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>

                  <button
                    className="text-sm"
                    onClick={() => {
                      context.addToCart(item);
                      toast.success("product  has been added");
                    }}
                  >
                    Click me
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Toaster />
    </div>
  );
}

export default FetchAPI;
