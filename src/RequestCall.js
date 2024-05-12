const key = process.env.REACT_APP_TMDB_Key;

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
  requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
  requestAiringToday: `https://api.themoviedb.org/3/tv/airing_today?api_key=${key}`,
  requestOnTheAir: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}`,
  requestTVPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}`,
  requestTVTopRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}`,
};

export default requests;
