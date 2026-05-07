import { configureStore } from "@reduxjs/toolkit";

import PhotoReducer from "./reducers/PhotosReducer";
import VideoReducer from "./reducers/VideoReducer";
import CollectionReducer from "./reducers/CollectionReducer";
import QueryReducer from "./reducers/QueryReducer";

export const store = configureStore({
  reducer: {

    Photoes: PhotoReducer,

    Videoes: VideoReducer,

    Collection: CollectionReducer,

    Query: QueryReducer
  },
});