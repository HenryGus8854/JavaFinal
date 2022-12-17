window.onload = function () {
    document.querySelector("#loginForm").addEventListener("submit", login);

};

function login(event) {
    event.preventDefault();

    let user = {
        "username": document.querySelector("#username").value,
        "password": document.querySelector("#password").value
    };

    validateUser(user);
}

function validateUser(user) {
    let url = "UserService/users/" + user.username + "&login";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText.trim();
            if (resp.search("ERROR") >= 0 || resp !== "true") {
                alert("could not complete login request");
                console.log(resp);
            } else {
                alert(" request completed successfully");
                console.log(resp);
            }
        }
    };
    xmlhttp.open("PUT", url, true);
    xmlhttp.send(JSON.stringify(user));

}