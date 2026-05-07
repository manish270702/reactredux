import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setcollection } from "../store/reducers/CollectionReducer";

function Photos() {

  const [page, setpage] = useState(1)
  const fetchPhotos = async () => {
    try {
      const data = await getPhotos(query,page);

      dispatch(setPhotoes(data));

    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const results = useSelector(
    (state) => state.Photoes.value
  );
  
  const dispatch = useDispatch();

  const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos")) || [];
  const [saved, setsaved] = useState(savedPhotos);

  const saveToLocal = (url) => {
      savedPhotos.push(url);
      setsaved(savedPhotos);
      dispatch(setcollection(savedPhotos));
      localStorage.setItem("savedPhotos", JSON.stringify(savedPhotos));
  }

  return (

    <div className="grid grid-cols-4 px-20 gap-5 p-5">

      {results.map((photo) => (

        <div key={photo.id} className="relative border rounded">
        <img
        className="w-full h-80 object-cover rounded"
          key={photo.id}
          src={photo.urls.raw}
          alt={photo.slug}
        />
        <button onClick={()=>{saveToLocal(photo.urls.raw)}} className="bg-blue-400 px-4 py-2 rounded absolute bottom-2 right-2 text-white cursor-pointer">{saved.includes(photo.urls.raw) ? "Saved" : "Save"}</button>
        </div>

      ))}

    </div>
  );
}

export default Photos;