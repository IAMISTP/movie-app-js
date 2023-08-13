import { Component } from "../core/heropy";
import movieStore, { searchMivoes } from "../store/movie";
export default class Search extends Component {
  render() {
    this.el.classList.add("search");
    this.el.innerHTML = /* html */ `
        <input placeholder="Enter the movie title to search!" />
        <button class='btn btn-primary'>Search!</button>
        `;

    const inputEl = this.el.querySelector("input");
    inputEl.addEventListener("input", () => {
      movieStore.state.searchText = inputEl.value;
    });
    inputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && movieStore.state.searchText.trim()) {
        searchMivoes(1);
      }
    });

    const btnEl = this.el.querySelector("button");
    btnEl.addEventListener("click", () => {
      if (movieStore.state.searchText.trim()) {
        searchMivoes(1);
      }
    });
  }
}
