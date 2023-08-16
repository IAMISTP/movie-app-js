import { Store } from "../core/heropy";

const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
});

export default store;
export const searchMivoes = async (page) => {
  store.state.page = page;
  if (page === 1) {
    //page 가 1이면 초기화
    store.state.movies = [];
  }
  //영화정보가져오기
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=7035c60c&s=${store.state.searchText}&page=${page}`
  );
  const { Search, totalResults } = await res.json();
  store.state.movies = [...store.state.movies, ...Search];

  store.state.pageMax = Math.ceil(Number(totalResults) / 10);
};
