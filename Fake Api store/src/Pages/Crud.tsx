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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data } = useQuery<Item[]>("store", () =>
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

  const queryClient = useQueryClient();

  const mutation = useMutation(deleteProduct);
  useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries("store");
    }
  }, [mutation.isSuccess, queryClient]);

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  const openDeleteConfirmation = (id: number) => {
    setProductIdToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setProductIdToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const filteredData = data
    ? data.filter(
        (item) =>
          selectedCategory === null || item.category === selectedCategory
      )
    : [];

  const sortedData = [...filteredData].sort((sec, fir) => {
    if (sortOrder === "asc") {
      return fir.price - sec.price;
    } else {
      return sec.price - fir.price;
    }
  });

  return (
    <div className="container mx-auto mt-20 flex-1">
      <div className=" mx-auto w-3/4 ">
        <div className="container flex  py-3 pl-2 space-x-2 items-center  justify-between   ">
          <div className="relative z-0 inline-flex  md:flex-row flex-col gap-2  ">
            <select
              className="px-4 py-2 border rounded-md text-sm shadow-sm "
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            <select
              className="px-4 py-2 border rounded-md text-sm shadow-sm"
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
                {sortedData?.map((item) => (
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
