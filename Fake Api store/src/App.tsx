import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import Crud from "./Pages/Crud";
import Shop from "./Pages/Shop";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import SingProduct from "./Pages/SingProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componements/Navbar/Nav";
import { QueryClient, QueryClientProvider } from "react-query";
import BooksContextProvider from "./context/Context";
import Editprod from "./Pages/Editprod";
import PageNotFound from "./Pages/PageNotFound ";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BooksContextProvider>
        <Router>
          <div className="bg-blue-50 min-h-screen flex flex-col justify-between ">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Crud" element={<Crud />} />
              <Route path="/store" element={<Shop />} />
              <Route path="/store/:id" element={<SingProduct />} />
              <Route path="/crud/:id" element={<Editprod />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </Router>
      </BooksContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
