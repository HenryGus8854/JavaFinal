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
            if (resp === "null") {
                alert("could not complete login request");
                console.log(resp);
            } else {
                alert(" request completed successfully");
                console.log(resp);
                window.location.href = `createSession.jsp?username=${user.username}`;
            }

        console.log(resp);
        }
    };
    xmlhttp.open("PUT", url, true);
    xmlhttp.send(JSON.stringify(user));

}

function GrabAllAnswers() {
    let answer = [];
    let allQuestionCards = document.querySelectorAll("#mainContainer .container");

    for (let question of allQuestionCards) {
        let radioButtons = question.querySelectorAll("input");

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked)
                answer.push(i);
        }
    }

    return answer;
}