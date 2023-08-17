import {
  ShoppingBagIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
  BellIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BooksContext } from "../../context/Context";

function Navbar() {
  const context = useContext(BooksContext);

  let total = context.state.cart.length;

  console.log(total);
  const navigate = useNavigate();
  const links = [
    { name: "Home", Link: "/" },

    { name: "Store", Link: "/store" },
  ];
  const [isOpen, setIsopen] = useState(false);
  const handeledit = () => {
    navigate("./Crud");
  };
  const handelCart = () => {
    navigate("./cart");
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0  z-20">
      <div className="md:px-10 py-3 px-5  bg-cyan-500  md:flex justify-between items-center gap-2 ">
        <div className="flex text-2x1 gap-1 items-center  cursor-pointer ">
          <ShoppingBagIcon className="w-7 h-7 text-white " />
          <span className="font-bold text-white">FakeShop</span>
        </div>
        <div
          onClick={() => setIsopen(!isOpen)}
          className="absolute right-8 top-4 cursor-pointer md:hidden text-center w-7 h-7 text-white"
        >
          {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-cyan-500 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-100 ease-in    ${
            isOpen ? `top-12` : `top-[-490px]`
          }`}
        >
          {links.map((link) => (
            <li
              key={link.Link}
              className="font-semibold text-white my-7 md:my-0 md:ml-8"
            >
              <Link to={link.Link}> {link.name}</Link>
            </li>
          ))}
          <div className="flex">
            <PencilSquareIcon
              className="w-7 h-7 ml-6 text-white hover:text-red-200"
              onClick={handeledit}
            />
            <div className="relative inline-block">
              <BellIcon
                onClick={handelCart}
                className="w-7 h-7 ml-6 text-white hover:text-red-200"
              />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-300 rounded-full">
                {total}
              </span>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
