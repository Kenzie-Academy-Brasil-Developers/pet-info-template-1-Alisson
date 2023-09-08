import { showPostModal } from "./modals.js";
import { renderAllPosts } from "./render.js";
import { getAllPosts, getCurrentUserInfo } from "./requests.js";

function getData() {
  getCurrentUserInfo()
  renderAllPosts()
}

getData();

showPostModal() 


function handleLogout() {
  const button = document.querySelector("#user__image")
  const div = document.querySelector(".user__logout")
  button.addEventListener("click", () => {
    div.classList.toggle("hidden")
  })
  const logout = document.querySelector(".logout__button")
  logout.addEventListener("click", () => {
    location.replace("../../")
    localStorage.clear()
  })
}

handleLogout()

