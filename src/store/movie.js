import { Store } from "../core/heropy";

const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: "Search for the movie title",
});

export default store;
export const searchMivoes = async (page) => {
  store.state.loading = true;
  store.state.page = page;
  if (page === 1) {
    //page 가 1이면 초기화
    store.state.movies = [];
  }
  //영화정보가져오기
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=7035c60c&s=${store.state.searchText}&page=${page}`
    );
    const { Search, totalResults, Response, Error } = await res.json();
    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search];
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
    }
  } catch (error) {
    console.log(error);
  } finally {
    store.state.loading = false;
  }
};
export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
    );
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails error: ", error);
  }
};
