import { registerRequest } from "./requests.js"

function loginRedirect () {
    const btn = document.querySelector("#redirect__button")
    btn.addEventListener("click",  (e) => {
        e.preventDefault()
        location.replace("../../index.html")
    })
}

loginRedirect()

function registerForm () {
    const inputs = document.querySelectorAll("input")
    const button = document.querySelector("#register__submit")
    let count = 0
    let registerBody = {}
    button.addEventListener("click", (e) => {
        e.preventDefault()
        inputs.forEach(i => {
            if (i.value.trim() !== "") {
                registerBody[i.name] = i.value
            } else {
                count++
                i.insertAdjacentHTML("afterend", `
                <p class= "error__text">Preencha o campo de ${i.id}</p>
                `)
            }
        })
        setTimeout(() => {
            const errors = document.querySelectorAll(".error__text")
            errors.forEach(err => err.remove())
        }, 3500);
        if (count === 0) {
            registerRequest(registerBody)
        } else {
            count = 0
        }
    })
    
}

registerForm()