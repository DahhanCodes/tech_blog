$(document).ready(function () {
    var signUpForm = $("#signup-form")
    var userToPost
    signUpForm.on("submit", function (event) {
        event.preventDefault();

        var username = document.querySelector('#username-signup').value.trim();
        var password = document.querySelector('#password-signup').value.trim();

        console.log("clicked")
        userToPost = {
            usernameValue: username,
            passwordValue: password
        }
        console.log(usernameValue)
        console.log(username)
        console.log(userToPost.first)

        if (userToPost.usernameValue === undefined || userToPost.passwordValue === undefined) {
            alert("please fill out the form")

        }

        console.log(userToPost)
        postUserToDB(userToPost.usernameValue, userToPost.passwordValue)
    });

    function postUserToDB(username, password) {
        $.post('/api/users/signUp', {
            username,
            password

        })
            .then(function () {
                document.location.replace('/dashboard');
            })
    };


});