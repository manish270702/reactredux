import { useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const SearchBar = lazy(() => import("./components/SearchBar"));

function App() {
  const navigate = useNavigate();

  const query = useSelector((state)=>state.Query.value)

  return (
    <div className="px-20">
      <SearchBar />
      <div className="flex items-center justify-between mt-5">
        <div className="flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 bg-blue-400 rounded"
            onClick={() => navigate("/photos")}
          >
            Images
          </button>

          <button
            className="px-4 py-2 bg-purple-400 rounded"
            onClick={() => navigate("/videos")}
          >
            Videos
          </button>
        </div>
        <button
          onClick={() => navigate("/collections")}
          className="px-4 py-2 rounded bg-blue-300"
        >
          Collections
        </button>
      </div>

      <Outlet />
    </div>
  );
}

export default App;