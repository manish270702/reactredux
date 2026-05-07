import axios from 'axios';

async function getPhotos(query, page = 1) {

  try {

    const res = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query,
          page,
          per_page: 20,
          client_id:
            import.meta.env.VITE_UNSPLASHKEY,
        },
      }
    );

    return res.data.results;

  } catch (error) {

    console.log(error);

    return [];
  }
}

async function getVideos(query) {
  try {
    const res = await axios.get(
      "https://api.pexels.com/videos/search",
      {
        params: {
          query: query,
          per_page: 20,
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELSKEY,
        },
      }
    );

    // console.log(res.data);

    return res.data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}


export { getVideos, getPhotos }