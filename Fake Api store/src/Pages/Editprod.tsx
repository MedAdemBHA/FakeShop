import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

type Item = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export default function Editprod() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, error, data } = useQuery<Item | null>("product", () =>
    fetch(`https://btngan-data.onrender.com/products/${id}`).then((res) =>
      res.json()
    )
  );

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setImage(data.image);
      setCategory(data.category);
    }
  }, [data]);

  const onEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      title !== "" &&
      price !== "" &&
      description !== "" &&
      image !== "" &&
      category !== ""
    ) {
      fetch(`https://btngan-data.onrender.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          image,
          category,
        }),
      }).then(() => {
        navigate("/");
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {}</div>;

  if (!data) return <div>No data available</div>;

  return (
    <div className="container mx-auto">
      <div className="w-full py-10 max-w-lg mx-auto mt-8">
        <h2 className="text-2xl font-bold text-gray-800 py-6">Edit Product</h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onEdit}
        >
          {/* Title Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Description Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Price Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          {/* Image Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image URL
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          {/* Category Field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="select" selected>
                select a category
              </option>
              <option value="jewelery">jewelery</option>
              <option value="women's_clothing">women's_clothing</option>
              <option value="men's_clothing">men's_clothing</option>
              <option value="electronics">electronics</option>
            </select>
            <input type="text" onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-200 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
