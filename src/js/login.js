const email_input = document.getElementById("email")
const password_input = document.getElementById("password")
const login_btn = document.getElementById("login_btn")

const login_api = "https://job-seek-app-back.vercel.app//user/login"
const localhost ="http://127.0.0.1:5501"
  function login() {
    if (password_input.value.trim() ==="" || email_input.value.trim() ==="") {
        return alert("enter all fields  ...")
    } else {
        try {
            const user =  fetch(login_api, {
            method: "POST",
            body: JSON.stringify({
                user_email: email_input.value.trim(),
                user_password: password_input.value.trim()
            }),
            headers: { "content-type": "application/json" }
        }); 

        user.then((data)=> data.json()).then((response)=>{
            if(response.success === true ){
                localStorage.setItem("user_status", JSON.stringify("login"))
                
                location.href=`${localhost}/index.html`
            }else { 
                alert("Wrong Credentials ... ")
            }
        }).catch((error)=>{
            alert(error.message)
        })
        } catch (error) {
            alert(error.message)
        }
    }

}


login_btn.addEventListener("click", login)