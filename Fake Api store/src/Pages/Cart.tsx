import { ChangeEvent, useContext } from "react";
import { BooksContext } from "../context/Context";
import { Toaster, toast } from "sonner";
import Paypal from "../componements/Paypal";
export default function Cart() {
  const context = useContext(BooksContext);

  const totalCartAmount = context.state.cart
    .reduce((total, Item) => (total = total + Item.price * Item.count), 0)
    .toFixed(2);

  const totalCartCount = context.state.cart.reduce(
    (total, Item) => (total = total + Item.count),
    0
  );

  const quantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === "") {
      return;
    }

    if (value !== "0") {
    }
  };
  return (
    <div className="container mx-auto mt-5 flex-1">
      <div className="flex flex-wrap shadow-md my-10">
        <div className="w-full md:w-1/1 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              Total: {totalCartAmount}$
            </h2>
            <h2 className="font-semibold text-2xl"> {totalCartCount} Items</h2>
          </div>
          <div className="flex items-center justify-between mt-10 mb-5 border-b pb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/3">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/3 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/3 text-center">
              Total
            </h3>
          </div>
          <div>
            {context.state.cart.map((Item) => (
              <div
                className="flex items-center gap-10 mt-10 mb-5 border-b pb-5 "
                key={Item.id}
              >
                <div className="flex w-1/3 items-center">
                  <div className="w-20">
                    <img src={Item.image} />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{Item.title}</span>
                  </div>
                </div>
                <div className="flex justify-center gap-5 w-1/3">
                  <button onClick={() => context.decrease(Item.id)}>
                    <svg
                      className="fill-current text-gray-600 w-3 cursor-pointer"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      context.removeFromCart(Item.id);
                      toast.error("Deleted  ");
                    }}
                    className=" border text-center p-1  w-auto bg"
                  >
                    Remove
                  </button>
                  <input
                    className="mx-2 border text-center w-8"
                    type="text"
                    onChange={(e) => quantityHandler(e)}
                    value={Item.count}
                  />
                  <button onClick={() => context.increase(Item.id)}>
                    <svg
                      name="increase"
                      className="fill-current text-gray-600 w-3 cursor-pointer"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>{" "}
                  </button>
                </div>
                <div>
                  <span className="text-center w-1/3 font-semibold text-sm">
                    ${(Item.count * Item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <div className=" fixed bottom-3 right-6   flex justify-end  ">
              <Paypal />
            </div>

            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
