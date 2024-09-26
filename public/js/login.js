let useremail = document.getElementById("email");
let userpassword = document.getElementById("password");

function Login(event) {
    event.preventDefault();
    const email = useremail.value;
    const password = userpassword.value;

    const data = {
        email: email,
        password: password
    };

    sendData(data);
}

async function sendData(data) {
    
    try {
        // Match the route to your backend route
        const res = await axios.post('/login/userdata/users', data);
        
        if (res.status == 200) {
            // Store the token in localStorage
            localStorage.setItem('token', res.data.token);
            console.log('token', res.data.token);
            alert(res.data.msg);
            
            // Clear input fields
            useremail.value = '';
            userpassword.value = '';
            
            // Redirect after successful login
            window.location.href = '/booking'; 
        }
    } catch (err) {
        console.log('Error', err);
        alert('Login failed! Please try again.');
    }
}
