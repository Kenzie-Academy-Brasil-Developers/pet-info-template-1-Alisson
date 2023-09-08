import { renderAllPosts } from "./render.js";

const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const token = localStorage.getItem("@petInfo:token")
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await request.json();

  const img =  document.querySelector("#user__image")
  img.src = user.avatar
  const name = document.querySelector(".user__uniquename")
  name.innerHTML = "@" + user.username
  const userImg = document.querySelector("#user__image")
  userImg.src = user.avatar

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const token = localStorage.getItem("@petInfo:token")
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const posts = await request.json();
  return posts;
}

export async function loginRequest (requestBody) {
  const token = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
  .then(async res => {
    const convert = await res.json();
    if (res.ok) {
      localStorage.setItem("@petInfo:token", convert.token)
      alert("Usuário reconhecido com sucesso")
      setTimeout(() => {
        location.replace("./src/pages/feed.html")
      }, 2000);
    } else {
      throw new Error (
        convert.message
      )
    }
  })
  .catch(erro => alert(erro))
}

export async function registerRequest (requestBody) {
  const token = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
  .then(async res => {
    const convert = await res.json();
    if (res.ok) {
      alert("Usuário criado com sucesso")
      setTimeout(() => {
        location.replace("../../")
      }, 2000);
    } else {
      throw new Error (
        convert.message
      )
    }
  })
  .catch(erro => alert(erro))
}

export async function newPostRequest(postBody){
  const token = localStorage.getItem('@petInfo:token')
  const post = await fetch(`${baseUrl}/posts/create`, {
  method: "POST",
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(postBody)
  })
  .then(async res => {
      const resJson = await res.json()
      if (res.ok) {
          alert("Novo post criado!")
          return resJson
      }else{
          throw new Error(
              resJson.message
          );
      }
  })
  .catch((err) => alert(err))
  renderAllPosts()
  return post
}

export async function deleteReques(id) {
  const token = localStorage.getItem('@petInfo:token')
  const deletePost = await fetch(`${baseUrl}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(async res => {
    const resJson = await res.json()
    console.log(resJson)
    if (res.ok) {
      console.log(resJson.message)
      renderAllPosts()
    } 
  })
}

export async function editRequest(id, editBody) {
  const token = localStorage.getItem('@petInfo:token')
  const editPost = await fetch(`${baseUrl}/posts/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(editBody)
  })
  .then(async res => {
    const  resJson = await res.json()
    if (res.ok) {
      alert("Post alterado com sucesso")
      renderAllPosts()
    } else{
      throw new Error(
          resJson.message
      );
  }
})
.catch((err) => alert(err))

return editPost

}

export async function getPost(id) {
  const token = localStorage.getItem("@petInfo:token")
  const request = await fetch(`${baseUrl}/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const posts = await request.json();
  console.log(posts)
  return posts;
}