import { useMutation, useQuery, useQueryClient } from "react-query";
import Modal from "../componements/Modal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Item = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

function Crud() {
  // State to manage deletion confirmation modal
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );
  // State for sorting and filtering

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // State for pagination

  // React Query hook to interact with the query cache
  const queryClient = useQueryClient();
  // React Query hook to fetch data
  const { isLoading, data } = useQuery<Item[]>("store", () =>
    fetch("https://btngan-data.onrender.com/products").then((res) => res.json())
  );

  const deleteProduct = async (id: number) => {
    const response = await fetch(
      `https://btngan-data.onrender.com/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  };
  const mutation = useMutation(deleteProduct);
  // Effect to invalidate the "store" query when a mutation is successful
  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries("store");
    }
  }, [mutation.isSuccess, queryClient]);

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  // Filtering data based on selected category
  const filteredData = data
    ? data.filter(
        (item) =>
          selectedCategory === null || item.category === selectedCategory
      )
    : [];

  // Sorting filtered data based on price and sortOrder
  const sortedData = [...filteredData].sort((sec, fir) => {
    if (sortOrder === "asc") {
      return fir.price - sec.price;
    } else {
      return sec.price - fir.price;
    }
  });
  // Extracting the data to be displayed on the current page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = sortedData.slice(startIndex, endIndex);

  // Function to close /open  the delete confirmation modal
  const openDeleteConfirmation = (id: number) => {
    setProductIdToDelete(id);
    setShowDeleteConfirmation(true);
  };
  const closeDeleteConfirmation = () => {
    setProductIdToDelete(null);
    setShowDeleteConfirmation(false);
  };
  if (isLoading)
    return (
      <div className="md:space-x-2">
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-20 h-20 mr-2 mt-[100px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
  return (
    <div className="container mx-auto mt-20 flex-1">
      <div className=" mx-auto w-3/4 ">
        <div className="container flex  py-3 pl-2 space-x-2 items-center  justify-between   ">
          <div className="relative z-0 inline-flex  md:flex-row flex-col gap-2  ">
            <select
              className="px-4 py-2 border rounded-md text-sm shadow-sm  cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            <select
              className="px-4 py-2 border rounded-md text-sm shadow-sm cursor-pointer"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              <option value="لبس رجالي">لبس رجالي</option>
              <option value="مجوهرات">مجوهرات</option>
              <option value="إلكترونيات">إلكترونيات</option>
            </select>
          </div>
          <Modal />{" "}
        </div>
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedData?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-sm  font-medium text-gray-800 ">
                      {item.id}
                    </td>
                    <td className="px-6 py-4  overflow-x-hidden text-sm text-gray-800 ">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 ">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 ">
                      {item.price}$
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 ">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right ">
                      <Link
                        className="text-green-500 hover:text-green-700"
                        to={`/crud/${item.id}`}
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right ">
                      <a
                        onClick={() => openDeleteConfirmation(item.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
              className={`
    px-4 py-2 border rounded-md text-sm shadow-sm
    ${
      currentPage === 1
        ? "bg-disabledBackground text-disabledText cursor-not-allowed text-red-600 "
        : "bg-primary hover:bg-primary-dark"
    }
  `}
            >
              Previous Page
            </button>
            <div className="px-4 py-2 border rounded-md text-sm shadow-sm">
              {currentPage}/{Math.ceil(sortedData.length / itemsPerPage)}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prevPage) =>
                  Math.min(
                    prevPage + 1,
                    Math.ceil(sortedData.length / itemsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(sortedData.length / itemsPerPage)
              }
              className={`
              px-4 py-2 border rounded-md text-sm shadow-sm
              ${
                currentPage === Math.ceil(sortedData.length / itemsPerPage)
                  ? "bg-primary text-red-600 hover:bg-primary-dark cursor-not-allowed"
                  : "bg-disabledBackground text-disabledText "
              }   
            `}
            >
              Next Page
            </button>
          </div>
        </div>
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
              <p className="text-lg font-medium mb-2">Confirm Delete</p>
              <p className="text-sm text-gray-700">
                Are you sure you want to delete this product?
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  className="text-red-500 hover:text-red-700 font-medium mr-4"
                  onClick={closeDeleteConfirmation}
                >
                  Cancel
                </button>
                <button
                  className="text-green-500 hover:text-green-700 font-medium"
                  onClick={() => {
                    handleDelete(productIdToDelete!);
                    closeDeleteConfirmation();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Crud;
