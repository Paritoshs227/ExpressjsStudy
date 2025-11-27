const APP_URL = 'http://localhost:3000/api/users';
const loginform = document.getElementById('loginForm');
const registrationform = document.getElementById('registrationForm');

// ------------------ REGISTRATION ------------------
if (registrationform) {
    registrationform.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.querySelector("#registerusername").value;
        const email = document.querySelector("#registeremail").value;
        const password = document.querySelector("#registerpassword").value;

        try {
            const res = await fetch(`${APP_URL}/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Registration successful. Please login.");
                window.location.href = 'login.html';
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {
            alert("Error connecting to server");
            console.error(err);
        }
    });
}

// ------------------ LOGIN ------------------
if (loginform) {
    loginform.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        try {
            const url=`${APP_URL}/login`
            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = 'index.html';
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            alert("Error connecting to server");
            console.error(err);
        }
    });
}
