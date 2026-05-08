import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { setcollection } from "../store/reducers/CollectionReducer";

import { getVideos } from "../api/api";

import {
  setvideoes,
  clearvideoes,
} from "../store/reducers/VideoReducer";

function Videos() {
  const dispatch = useDispatch();

  const query = useSelector(
    (state) => state.Query.value
  );

  const videos = useSelector(
    (state) => state.Videoes.value
  );

  const [page, setpage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  // fetch videos
  const fetchvideos = async () => {
    try {
      console.log("VIDEO PAGE:", page);

      const response = await getVideos(
        query,
        page
      );

      dispatch(setvideoes(response));

      if (response.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(
        "Error fetching videos:",
        error
      );
    }
  };

  // reset when query changes
  useEffect(() => {
    dispatch(clearvideoes());

    setpage(1);

    setHasMore(true);
  }, [query]);

  // fetch when page changes
  useEffect(() => {
    if (query) {
      fetchvideos();
    }
  }, [page, query]);

  // next page
  const fetchMoreData = () => {
    setpage((prev) => prev + 1);
  };

  // local storage
  const existing =
    JSON.parse(
      localStorage.getItem("savedVideos")
    ) || [];

  const [saved, setsaved] =
    useState(existing);

  const saveToLocal = (id, url) => {
    const alreadySaved = saved.some(
      (item) => item.id === id
    );

    if (!alreadySaved) {
      const updated = [
        ...saved,
        {
          id,
          url,
          type: "video",
        },
      ];

      setsaved(updated);

      localStorage.setItem(
        "savedVideos",
        JSON.stringify(updated)
      );

      dispatch(setcollection(updated));
    }
  };

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <h1 className="text-center py-5">
          Loading...
        </h1>
      }
      endMessage={
        <h1 className="text-center py-5">
          No more videos
        </h1>
      }
    >
      <div className="grid grid-cols-4 px-20 gap-4 p-5">
        {videos.length > 0 ? (
          videos.map((video) => {
            const videoUrl =
              video.video_files.find(
                (file) =>
                  file.file_type ===
                  "video/mp4"
              )?.link;

            return (
              <div
                key={video.id}
                className="h-76 border rounded flex items-end flex-col gap-2"
              >
                <video
                  controls
                  muted
                  className="w-full h-64 object-cover rounded"
                >
                  <source
                    src={videoUrl}
                    type="video/mp4"
                  />
                </video>

                <button
                  onClick={() =>
                    saveToLocal(
                      video.id,
                      videoUrl
                    )
                  }
                  className="bg-blue-400 px-4 py-2 rounded text-white cursor-pointer"
                >
                  {saved.some(
                    (item) =>
                      item.id === video.id
                  )
                    ? "Saved"
                    : "Save"}
                </button>
              </div>
            );
          })
        ) : (
          <h1 className="text-center col-span-4 text-3xl">
            No results found
          </h1>
        )}
      </div>
    </InfiniteScroll>
  );
}

export default Videos;