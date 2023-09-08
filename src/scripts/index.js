import { loginRequest } from "./requests.js"

function registerRedirect () {
    const btn = document.querySelector("#register__button")
    btn.addEventListener("click", (e) =>  {
        e.preventDefault()
        location.replace("./src/pages/register.html")
    })
}

registerRedirect()

function loginForm () {
    const inputs = document.querySelectorAll("input")
    const button = document.querySelector("#login__submit")
    let count = 0
    let loginBody = {}
    button.addEventListener("click", (e) => {
        e.preventDefault()
        inputs.forEach(i => {
            if (i.value.trim() !== "") {
                loginBody[i.name] = i.value
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
            loginRequest(loginBody)
        } else {
            count = 0
            const password = document.querySelector("#Senha")
            password.value = ""
        }
    })
    
}

loginForm()