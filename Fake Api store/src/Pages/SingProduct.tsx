import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BooksContext } from "../context/Context";

type Item = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export default function SingProduct() {
  const context = useContext(BooksContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, error, data } = useQuery<Item | null>(id as string, () =>
    fetch(`https://btngan-data.onrender.com/products/${id}`).then((res) =>
      res.json()
    )
  );
  console.log(data);

  if (isLoading) return <div> lodding ...</div>;

  if (error) return "An error has occurred: " + error;
  // Assuming data is an array of items
  if (!data) return <div> No data available</div>;
  return (
    <div key={data.id}>
      <div className="container px-5 py-24 mx-auto rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
        <div className="lg:w-4/5  flex flex-wrap">
          <img
            src={data.image}
            alt={data.title}
            className="lg:w-1/4 w-1/2 mx-auto lg:h-auto  object-cover object-center rounded"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              ON SALE
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data.title}
            </h1>
            <div className="flex mb-4">
              <span className="text-gray-600 ml-3">{data.category}</span>
            </div>
            <p className="leading-relaxed">{data.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  navigate("/store");
                }}
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
              </button>
              <span className="title-font font-medium text-2xl ml-5 text-gray-900">
                ${data.price}
              </span>
              <button
                onClick={() => {
                  context.addToCart(data);
                }}
                className="flex text-white bg-red-200 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add to Car
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
