import axios from 'axios';


//this will fetch the photos from the unsplash
async function getPhotos(query, page) {
  
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



//this will fetch the videos from the pexels
async function getVideos(query,page) {
  try {
    const res = await axios.get(
      "https://api.pexels.com/videos/search",
      {
        params: {
          query: query,
          per_page: 20,
          page

        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELSKEY,
        },
      }
    );

    console.log(res.data.videos);

    return res.data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}


export { getVideos, getPhotos }