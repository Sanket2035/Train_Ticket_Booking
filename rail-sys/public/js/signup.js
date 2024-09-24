let username = document.getElementById("name")
let useremail = document.getElementById("email")
let usernumber = document.getElementById("number")
let userpassword = document.getElementById("password")
let usercpassword = document.getElementById("cpassword")

function submitData(event) {
    event.preventDefault();
    const name = username.value
    const email = useremail.value
    const number = usernumber.value
    const password = userpassword.value
    const cpassword = usercpassword.value
    console.log(name, email, password, number, cpassword)

    const data = {
        name: name,

        email: email,
        number: number,
        password: password,
        cpassword: cpassword

    }
    if (cpassword == password) {
        sendData(data)
    } else {
        document.getElementById('errorPassword').innerHTML = "Password is not Matched"
    }
}
async function sendData(data) {
    try {
        const res = await axios.post('/signup/data', data)
        if (res.status == 200) {
            alert(res.data.msg);

            window.location.href = "/login";
        }
        username.value = ''
        userrole.value = ''
        useremail.value = ''
        usernumber.value = ''
        userpassword.value = ''
        usercpassword.value = ''
    } catch (err) {
        console.log('Error', err.message)
        document.getElementById('errorPassword').innerHTML = "Bad Parameters or This Email is alrady taken"

    }


}