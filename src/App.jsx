import { useState, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getPhotos, getVideos } from "./api/api";

// import { setPhotoes } from "./store/reducers/PhotosReducer";
// import { setvideoes } from "./store/reducers/VidepReducer";
import { setQuery } from "./store/reducers/QueryReducer";

function App() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [q, setq] = useState(null)

  console.log(useSelector((state) => state.Query.value));

  function updateQuery(e){
    setq(e.target.value)
  }

  // const fetchVideos = async () => {
  //   try {
  //     const data = await getVideos(query);

  //     dispatch(setvideoes(data));

  //     navigate("/videos"); // ✅ navigate
  //   } catch (error) {
  //     console.error("Error fetching videos:", error);
  //   }
  // };

  return (
    <div>
      <div className="flex items-center justify-center mt-5 gap-5">
        <input
          type="text"
          className="w-1/2 p-2 outline-0 border rounded"
          placeholder="enter query"
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />

        <button
          onClick={() => navigate("/collections")}
          className="px-4 py-2 rounded bg-blue-300"
        >
          Collections
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-5">
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

        <Outlet />
    </div>
  );
}

export default App;