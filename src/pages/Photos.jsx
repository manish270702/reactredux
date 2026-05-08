import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { getPhotos } from "../api/api";
import {
  setPhotoes,
  clearPhotos,
} from "../store/reducers/PhotosReducer";

function Photos() {
  const dispatch = useDispatch();

  const query = useSelector((state) => state.Query.value);

  const results = useSelector(
    (state) => state.Photoes.value
  );

  const [page, setpage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  // fetch photos
  const fetchPhotos = async () => {
    try {
      console.log("API CALLED PAGE:", page);

      const data = await getPhotos(query, page);

      // append data in redux
      dispatch(setPhotoes(data));

      // stop infinite scroll if no data
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // reset when query changes
  useEffect(() => {
    dispatch(clearPhotos());

    setpage(1);

    setHasMore(true);
  }, [query]);

  // fetch on page change
  useEffect(() => {
    if (query) {
      fetchPhotos();
    }
  }, [page, query]);

  // infinite scroll next function
  const fetchMoreData = () => {
    setpage((prev) => prev + 1);
  };

  // local storage
  const existing = JSON.parse(localStorage.getItem("savedPhotos")) || [];

  const [saved, setsaved] = useState(existing);

  const saveToLocal = (url, id) => {
    const alreadySaved = saved.some(
      (item) => item.id === id
    );

    if (!alreadySaved) {
      const updated = [...saved, { id, url }];

      setsaved(updated);

      localStorage.setItem("savedPhotos", JSON.stringify(updated));
    }
  };

  return (
    <InfiniteScroll
      dataLength={results.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <h1 className="text-center text-2xl py-5">
          Loading...
        </h1>
      }
      endMessage={
        <h1 className="text-center text-2xl py-5">
          No more photos
        </h1>
      }
    >
      <div className="grid grid-cols-4 gap-5 py-5">
        {results.length > 0 ? (
          results.map((photo) => (
            <div
              key={photo.id}
              className="relative border rounded"
            >
              <img
                className="w-full h-80 object-cover rounded"
                src={photo.urls.raw}
                alt={photo.slug}
              />

              <button
                onClick={() =>
                  saveToLocal(
                    photo.urls.raw,
                    photo.id
                  )
                }
                className="bg-blue-400 px-4 py-2 rounded absolute bottom-2 right-2 text-white cursor-pointer"
              >
                {saved.some(
                  (item) => item.id === photo.id
                )
                  ? "Saved"
                  : "Save"}
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-center col-span-4 text-3xl">
            No results found
          </h1>
        )}
      </div>
    </InfiniteScroll>
  );
}

export default Photos;