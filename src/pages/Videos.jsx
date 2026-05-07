import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setcollection } from "../store/reducers/CollectionReducer";

function Videos() {

  const videos = useSelector(
    (state) => state.Videoes.value
  );

  const dispatch = useDispatch();

  const savedvideos = JSON.parse(localStorage.getItem("savedVideos")) || [];
  const [saved, setsaved] = useState(savedvideos);

  const saveToLocal = (url) => {
    if(!saved.includes(url)){
      savedvideos.push(url);
      setsaved(savedvideos);
      dispatch(setcollection(savedvideos));
      localStorage.setItem("savedVideos", JSON.stringify(savedvideos));
    }
  }

  
  
  return (

    <div className="grid grid-cols-4 px-20 gap-4 p-5">

      {videos.map((video) => {

        const videoUrl = video.video_files.find(
          (file) => file.file_type === "video/mp4"
        )?.link;

        return (

          <div key={video.id} className="h-76 border rounded flex items-end flex-col gap-2">
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
            <button onClick={()=>{saveToLocal(videoUrl)}} className="bg-blue-400 px-4 py-2 rounded  bottom-2 right-2 text-white cursor-pointer">{saved.includes(videoUrl) ? "Saved" : "Save"}</button>
          </div>
        );
      })}

    </div>
  );
}

export default Videos;