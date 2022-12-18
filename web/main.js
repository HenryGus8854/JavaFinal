let allQuizzes =[];
let username =null;
let quizBeingTaken;
var globalVariable={
       quizBeingTaken: quizBeingTaken
    };
window.onload = function () {
    // will only work in the index page
    // if (window.location.href.indexOf("index") > -1)
    //     document.querySelector("#logInButton").addEventListener("click", login);
    //password checking on sign up
    if(window.location.href.indexOf("login")> -1){
        // document.querySelector("#searchByTagButton").addEventListener("click", getQuizzesByTag);
        document.querySelector("#loginButton").addEventListener("change", login);
    }else{
        document.querySelector("#refresh").addEventListener("click", getAllQuizes);
        document.querySelector("#searchByTagButton").addEventListener("click", filterTableByTitle);
        confirmUser();
    }
    
};
function confirmUser() {
    let url = "UserService/users";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText.trim();
            if (resp === "null") {
                window.location.href="loginPage.html";
            } else {
                console.log(resp);
                username = resp;
                getAllQuizes();
                adjustNavbar();
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
function adjustNavbar(){
    let thenav = document.querySelector("#changer");
    let html = thenav.innerHTML;
    if(username=== null){
        html += "<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link active\" aria-current=\"page\" href=\"loginPage.html\">Log In</a>\n" +
                "</li>\n";
    }else{
        html += "<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link active\" aria-current=\"page\" href=\"quizResults.html\">Quiz Results</a>\n" +
                "</li>\n" +
                "<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link active\" href='' aria-current=\"page\" onclick='logout()'>Logout</a>\n" +
                "</li>\n";
        html +="<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link\" aria-current=\"page\">"+username+"</a>\n" +
                "</li>";

    }
    thenav.innerHTML=html;
}

function logout(){
    let url = "UserService/users"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            console.log("-->"+resp);
            if (resp.search("ERROR") >= 0) {
                alert("Something is wrong with the Logout.");
            } else {
                window.location.href("loginPage.html");
            }

        }
    };
    console.log(url);
    xmlhttp.open("POST", url, true);
    xmlhttp.send();

}

function validatePasswords(event) {
    let password = document.querySelector("#password").value;
    let passwordConfirmation = document.querySelector("#passwordConfirmation").value;

    if (password !== passwordConfirmation){
        event.preventDefault();
        alert("Password confirmation doesn't match password");
    }
}

//TODO: filter on the backend


function getAllQuizes(){
    let url = "quizapp/quizzes"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            //console.log(resp);
            if (resp.search("ERROR") >= 0) {
                alert("oh no, something is wrong with the GET ...");
            } else {
                // buildTable(resp);
                allQuizzes = JSON.parse(resp);
                buildTableBody(JSON.parse(resp));
            }
        }
    };
    //console.log(url);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function clearTable(){
    let theTable = document.querySelector("table");
    theTable.innerHTML = theTable.querySelector("tr").innerHTML;
}
// function buildTable(text) {
//     clearTable();
//     //console.log(text);
//     let arr = JSON.parse(text);
//     //console.log(arr);
//     // get JS Objects
//     let theTable = document.querySelector("table");
//     let html = theTable.querySelector("tr").innerHTML;
//     for (let i = 0; i < arr.length; i++) {
//         let row = arr[i];
//         allQuizzes.push(arr[i]);
//         html += "<tr id = '"+row.quizID+"'>";
//         html += "<td>" + row.quizID + "</td>";
//         html += "<td>" + row.quizTitle + "</td>";
//         html += "<td>" + row.questions.length + "</td>";
//         html += "<td><form action='quiz/takeQuiz.php'><input type='hidden' name='quizID' value='"+row.quizID+"'><button class='btn btn-outline-success takeQuiz'>Take quiz</button></form></td>";
//
//         html += "</tr>";
//     }
//     console.log(allQuizzes);
//
//     theTable.innerHTML = html;
//     document.querySelector(".takeQuiz").addEventListener("click",takeQuiz)
//
// }

function buildTableBody(allQuizzes) {
    clearTable();
    let theTable = document.querySelector("table");
    let html = theTable.querySelector("tr").innerHTML;

    for (let quiz of allQuizzes) {
        html += `<tr id="${quiz.quizID}">`;
            html += `<td>${quiz.quizID}</td>`;
            html += `<td>${quiz.quizTitle}</td>`;
            html += `<td>${quiz.questions.length}</td>`;
            html += `<td><form action='quiz/takeQuiz.php'><input type='hidden' name='quizID' value='${quiz.quizID}'><button class='btn btn-outline-success takeQuiz'>Take quiz</button></form></td>`;
        html += `</tr>`;
    }
    console.log(theTable);
    theTable.innerHTML = html;
    document.querySelectorAll(".takeQuiz").forEach(element=>element.addEventListener("click",takeQuiz));
}

function filterTableByTitle() {
    let userTitleInput = document.querySelector("#userTitleInput").value;
    let regex =  new RegExp(userTitleInput);
    let filteredArray = allQuizzes.filter( quiz => regex.test(quiz.quizTitle));
    buildTableBody(filteredArray);
}






function takeQuiz(e){
   let parent =  e.target.parentElement;
   let input = parent.firstChild.valueOf();
   console.log(input.value);
   //console.log(allQuizzes);
   for(let i = 0; i<allQuizzes.length; i++){
       if(allQuizzes[i].quizID === input.value){
           //console.log(allQuizzes[i].quizID);
           quizBeingTaken = allQuizzes[i];
           saveQuiz();
       }
   }
   console.log(quizBeingTaken);
}

function saveQuiz(){
let url = "CurrentQuiz"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            console.log("-->"+resp);
            if (resp.search("ERROR") >= 0) {
                alert("Something is wrong with the GET.");
            } else {
               window.location.href= "quizPage.html";
            }

        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.send(JSON.stringify(quizBeingTaken));
}

function getCurrentQuiz(){
    let url = "CurrentQuiz"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            console.log("-->"+resp);
            if (resp.search("ERROR") >= 0) {
                alert("Something is wrong with the GET.");
            } else {
                
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}