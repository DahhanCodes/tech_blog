$(document).ready(async function () {
    // Getting references to our form and inputs
    var loginForm = $("#login-form");
    var userName
    var passwordInput

    // When the form is submitted, we validate there's an username and password entered
    loginForm.on("submit", function (event) {
        event.preventDefault();
        console.log("here")
        userName = $("#username-login");
        passwordInput = $("#password-login");
        var userData = {
            username: userName.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an username and password we run the loginUser function and clear the form
        loginUser(userData.username, userData.password);
        userName.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the dashboard
    function loginUser(username, password) {
        $.post("/api/users/login", {
            username,
            password
        })
            .then(function () {
                window.location.replace("/dashboard");
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
                alert("username or password are incorrect!")

            });
    }
});
