import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { setcollection } from "../store/reducers/CollectionReducer";

function Collections() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // ✅ Redux state
  const saved = useSelector(
    (state) => state.Collection.value
  );

  // ✅ Load localStorage once
  useEffect(() => {

    const savedVideos =
      JSON.parse(localStorage.getItem("savedVideos")) || [];

    const savedPhotos =
      JSON.parse(localStorage.getItem("savedPhotos")) || [];

    dispatch(
      setcollection([
        ...savedPhotos,
        ...savedVideos,

      ])
    );


  }, []);

  console.log(saved[5]);

  return (

    <div className="p-5">

      <button
        className="px-4 py-2 rounded bg-blue-300 text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back
      </button>

      <h2 className="text-center text-2xl mb-5">
        Collections
      </h2>

      {saved.length === 0 ? (

        <h1 className="text-center text-3xl mt-20">
          No Saved Media
        </h1>

      ) : (

        <div className="grid grid-cols-4 gap-5">

          {saved.map((item) => (

            <div
              key={item.id}
              className="border rounded overflow-hidden shadow"
            >

              {item.type === "video" ? (

                <video
                  controls
                  muted
                  className="w-full h-80 object-cover"
                >
                  <source
                    src={item.url}
                    type="video/mp4"
                  />
                </video>

              ) : (

                <img
                  src={item.url}
                  alt="Saved"
                  className="w-full h-80 object-cover"
                />

              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Collections;