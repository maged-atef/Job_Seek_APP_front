
console.log(user_current_state)
const firstname_input = document.getElementById("firstName")
const lastname_input = document.getElementById("lastName")
const re_password_input = document.getElementById("repassword")
const register_btn = document.getElementById("register_btn")
const email_input = document.getElementById("email")
const password_input = document.getElementById("password")

const new_user_api = "http://localhost:3000/user/signup"

function register_newuser() {
    console.log("register hit")
    if (!password_input.value === re_password_input.value) {
        return alert("Password Entered not Match ...")
    } else {
        const user = fetch(new_user_api, {
            method: "POST",
            body: JSON.stringify({
                firstname_in: firstname_input.value,
                lastname_in: lastname_input.value,
                email_in: email_input.value,
                password_in: password_input.value
            }),
            headers: { "content-type": "application/json" }
        });

        user.then((data) => data.json()).then((response) => {
            if (response.success === true) {
                alert("Welome")
            } else {
                alert("Wrong Credentials ... ")
            }
        }).catch((error) => {
            alert(error.message)
        })
    }

}


register_btn.addEventListener("click", register_newuser)
