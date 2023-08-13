import { Store } from "../core/heropy";

const store = new Store({
  searchText: "",
  page: 1,
  movies: [],
});

export default store;
export const searchMivoes = async (page) => {
  //영화정보가져오기
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=7035c60c&s=${store.state.searchText}&page=${page}`
  );
  const json = await res.json();
  console.log(json);
};
