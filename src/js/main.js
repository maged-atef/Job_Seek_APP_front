const user_current_state = JSON.parse(localStorage.getItem("user_status"))||null;
console.log({ userLoged: user_current_state })

const login_page = document.getElementById("login")
const logout = document.getElementById("logout")
const register = document.getElementById("register")
const senddiv = document.getElementById("senddiv")


login_page.addEventListener("click", (e) => {
    e.preventDefault();
   
    if (user_current_state === "login") {
        return alert("logged")
    } else {
        location.href = "https://maged-atef.github.io/Job_Seek_APP_front/pages/login.html"
    }
})
register.addEventListener("click",(e)=>{
    e.preventDefault()
    if(user_current_state == "login"){
      return   alert("you already logged in ")
    }else { 
        location.href= "https://maged-atef.github.io/Job_Seek_APP_front/pages/register.html"
    }
})
logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("user_status", JSON.stringify("logout"))
    location.href ="https://maged-atef.github.io/Job_Seek_APP_front/pages/login.html"
})



// if user is logged in 
function if_user_logedin(){ 
     if(user_current_state == "login"){
      senddiv.classList.remove("d-none")
      register.classList.add("d-none")
      login_page.classList.add("d-none")
    }else { 
        senddiv.classList.add("d-none")
      register.classList.remove("d-none")
      login_page.classList.remove("d-none")
    }
}

if_user_logedin()