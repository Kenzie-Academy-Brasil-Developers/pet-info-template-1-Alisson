import { handleDate } from "./render.js"
import { deleteReques, editRequest, getPost, newPostRequest } from "./requests.js"

export function showPostModal() {
    const button = document.querySelector("#user__newpost")
    const modal = document.querySelector(".new__post")
    console.log(modal)
    button.addEventListener("click", () => {
        modal.showModal()
        closeNewPostModal()
        sendNewPost()
    })
}

function closeNewPostModal () {
    const modal = document.querySelector(".new__post")
    const title = document.querySelector("#new__post__title")
    const content = document.querySelector("#new__post__content")
    const btn = document.querySelector("#close__newPost")
    const cancel = document.querySelector("#cancel__newPost")

    btn.addEventListener("click", () => {
        modal.close()
    })
    cancel.addEventListener("click", () => {
        title.value  = ""
        content.value = ""
        modal.close()
    })
}

function sendNewPost() {
    const modal = document.querySelector(".new__post")
    const title = document.querySelector("#new__post__title")
    const content = document.querySelector("#new__post__content")
    const btn = document.querySelector("#publish__newPost")
    let newPost = {}
    btn.addEventListener("click", () => {
        if (title.value && content.value !== "") {
            newPost.title = title.value
            newPost.content = content.value
            newPostRequest(newPost)
            title.value = ""
            content.value = ""
            modal.close()
        }
    })
}

export function postDelete() {
    const modal = document.querySelector(".modal__delete")
    const closeModal = document.querySelector("#close__delete__modal")
    const cancelModal = document.querySelector("#cancel__delete__modal")
   
    closeModal.addEventListener("click", () => {
        modal.close()
    })
    cancelModal.addEventListener("click", () => {
        modal.close()
    })
}

export function editModal(post) {
    const modal = document.querySelector(".modal__edition")
    const title = document.querySelector("#edit__title")
    const content = document.querySelector("#edit__content")
    const cancel = document.querySelector(".modal__edition__footer > .close-cancel__button")
    const saveBtn = document.querySelector(".modal__edition__footer > .confirm__button")

    let editBody = {}

    title.value = post.title
    content.value  = post.content
    saveBtn.id = post.id

    cancel.addEventListener("click", () =>  {
        title.value = ""
        content.value = ""
        modal.close()
    })
    saveBtn.addEventListener("click", () => {
        editBody.title = title.value
        editBody.content  = content.value
        editRequest(saveBtn.id, editBody)
        modal.close()
    })

    const closeBtn = document.querySelector("#closeEdit")
    closeBtn.addEventListener("click", () =>  {
        modal.close()
    })
}

export function openPost(post) {
    const modal = document.querySelector(".modal__posts")
    const modalContent = document.querySelector("#modal__post__content")
    const date = handleDate(post.created_at);

    modal.showModal()
    modalContent.innerHTML = ""
    modalContent.insertAdjacentHTML("beforeend", `
    <div class="modal__post__header">
    <div>
        <img src=${post.user.avatar} alt="" class="post__user__icon">
        <p class="post__username">${post.user.username}</p>
        <p class="post__date">${date}</p>
    </div>
     <button id="closeOpenPost">X</button>
   </div>
   <div class="modal__post__content">
     <h2>${post.title}</h2>
     <p>${post.content}</p>
   </div>

    `)
    const button = document.querySelector("#closeOpenPost")
    button.addEventListener("click", () => {
        modal.close()
    })
}



