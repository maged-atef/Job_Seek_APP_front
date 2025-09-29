const sendmsg = document.getElementById("sendmsg");
const receiver_input = document.getElementById("receiver");
const body_input = document.getElementById("editor");
const title_input = document.getElementById("title");
const sendbulk_btn = document.getElementById("sendbulk")
const bulk_list_input = document.getElementById("bulk_list")
const list_emails = document.getElementById("list_emails")
const attachment = document.getElementById("attachment")
const msgform = document.getElementById("msgform")
const sender_input = document.getElementById("sender");


// Quil

const quill = new Quill('#editor', {
    theme: 'snow'
});

const editor = quill.root;
editor.addEventListener('drop', (e) => {
    e.preventDefault();
    const text = e.dataTransfer.getData('text');
    const dropPosition = quill.getSelection()?.index ?? quill.getLength();
    quill.insertText(dropPosition, text);
});

// send email or bulk with or without attchment
msgform.addEventListener("submit", async (e) => {
    e.preventDefault();
    if(sender_input.value =="" || title_input.value == "") return Toastify({text:"Enter All Fields ", duration:1500, style:{ background: "linear-gradient(to right, #b09e00ff, #96c93d)",}}).showToast(); 
    console.log('btn send msg clicked')
    //check att  //check single or bulk 
    const isFile = Boolean(attachment.files[0])
    const isBulk = Boolean(receiver_input.classList.contains('d-none'))
    const file = attachment.files[0];
    console.log({ seder: "form", bulk: isBulk, attch: isFile })
    const string_body = document.querySelector("#editor .ql-editor").innerHTML
    console.log(string_body)
    if (isBulk === false && isFile) {
        const formData = new FormData();

        formData.append('sender', sender_input.value)
        formData.append('receiver', receiver_input.value)
        formData.append('title', title_input.value)
        formData.append('body', string_body)
        formData.append('file', file)
        const sendmail = await fetch("http://localhost:3000/msg/sendmsg", {
            method: "POST",
            body: formData
        })
        const data = await sendmail.json();
        console.log(data)
        if (data.success === true) {
            //show single mode + attach toast msg 
            Toastify({
                text: "Email has been send",
                duration: 3000
            }).showToast();
        }
    } else if (isBulk && isFile) {
        const email_raw = list_emails.value
        console.log({ raw: email_raw })
        const email_arr = email_raw.split(',')
        console.log({ arr: email_arr })
        email_arr.forEach(async (email) => {
            try {
                const formData = new FormData();

                formData.append('sender', sender_input.value)
                formData.append('receiver', email.trim())
                formData.append('title', title_input.value)
                formData.append('body', string_body)
                formData.append('file', attachment.files[0])

                const sendmail = await fetch("http://localhost:3000/msg/sendmsg", {
                    method: "POST",
                    body: formData
                })
                const data = await sendmail.json();
                console.log(data)
                if (data.success === true) {
                    // bulk+ attach toast msg 
                    Toastify({
                        text: "Email has been send",
                        duration: 3000
                    }).showToast();
                }
            } catch (error) {
                console.log(error.message)
            }
        });
    } else if (isBulk && isFile === false) {
        const email_raw = list_emails.value
        console.log({ raw: email_raw })
        const email_arr = email_raw.split(',')
        console.log({ arr: email_arr })
        email_arr.forEach(async (email) => {
            try {
                const formData = new FormData();



                const sendmail = await fetch("http://localhost:3000/msg/sendmsgnoattchment", {
                    method: "POST",
                    body: JSON.stringify({
                        sender: sender_input.value,
                        receiver: email.trim(),
                        title: title_input.value,
                        body: string_body
                    }),
                    headers: { "content-type": "application/json" }
                })
                const data = await sendmail.json();
                console.log(data)
                if (data.success === true) {
                    // bulk+ attach toast msg 
                    Toastify({
                        text: "Email has been send",
                        duration: 3000
                    }).showToast();
                }
            } catch (error) {
                console.log(error.message)
            }
        });
    }
    else {



        const sendmail = await fetch("http://localhost:3000/msg/sendmsgnoattchment", {
            method: "POST",
            body: JSON.stringify({
                sender: sender_input.value,
                receiver: receiver_input.value,
                body: string_body,
                title: title_input.value
            }),
            headers: { "content-type": "application/json" }
        })
        const data = await sendmail.json();
        console.log(data)
        if (data.success === true) {
            // single no attach toast msg 
            Toastify({
                text: "Email has been send",
                duration: 3000
            }).showToast();
        } else {
            console.log(data)

        }
    }

});


// show and hide bulk email list 
sendbulk.addEventListener("click", (e) => {
    e.preventDefault()
    console.log('email list input showed')
    //check receiver input 
    if (bulk_list_input.classList.contains("d-none")) {

        receiver_input.classList.add('d-none')
        bulk_list_input.classList.remove('d-none')
    } else {
        receiver_input.classList.remove('d-none')
        bulk_list_input.classList.add('d-none')
    }

})
