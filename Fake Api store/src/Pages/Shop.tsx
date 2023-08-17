import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import FetchAPI from "../componements/FetchAPI";

export default function Shop() {
  return (
    <div className=" px-7 md:pt-20 pt-20  ">
      <QueryClientProvider client={queryClient}>
        <FetchAPI />
      </QueryClientProvider>
    </div>
  );
}
