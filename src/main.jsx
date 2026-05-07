import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store/Store.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const Collections = lazy(() => import("./pages/Collections.jsx"));
const App = lazy(() => import("./App.jsx"));
const Photos = lazy(() => import("./pages/Photos.jsx"));
const Videos = lazy(() => import("./pages/Videos.jsx"));

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="photos" element={<Photos />} />
            <Route path="videos" element={<Videos />} />
          </Route>

          <Route path="/collections" element={<Collections />} />
        </Routes>
      </Suspense>
    </Provider>
  </BrowserRouter>
);