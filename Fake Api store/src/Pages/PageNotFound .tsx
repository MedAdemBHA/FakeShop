import { useNavigate } from "react-router-dom";
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="container px-5 py-24 mx-auto rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
      <div className="w-full py-10 text-center	 mt-8 text-6xl">
        404 Page not found
      </div>
      <div className="flex flex-col font-medium md:flex-row mt-14 max-w-xs mx-auto  text-center  gap-5">
        <button
          className="btn bg-rose-300 text-white py-3 px-5 md:ml-8 rounded font-semibold md:static"
          onClick={() => navigate("./")}
        >
          Home
        </button>
        <button
          className="btn bg-rose-300 text-white py-3 px-5 md:ml-8 rounded font-semibold md:static"
          onClick={() => navigate("./store")}
        >
          Store
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
