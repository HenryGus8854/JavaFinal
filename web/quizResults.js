let allQuizResults = [];
let username = null;
window.onload = function () {
    getAllQuizResults();
    document.querySelector("#refresh").addEventListener("click", getAllQuizResults);
    document.querySelector("#searchByTagButton").addEventListener("click", filterTableByTitle);
    confirmUser();
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
                username = resp;
                adjustNavbar();
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

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

function adjustNavbar(){
    let thenav = document.querySelector("#changer");
    let html = thenav.innerHTML;
    if(username=== null){
        html += "<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link active\" aria-current=\"page\" href=\"loginPage.html\">Log In</a>\n" +
                "</li>\n";
    }else{
        html +="<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link active\" href='' aria-current=\"page\" onclick='logout()'>Logout</a>\n" +
                "</li>\n";
        html +="<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link\" aria-current=\"page\">"+username+"</a>\n" +
                "</li>";

    }
    thenav.innerHTML=html;
}




function getAllQuizResults() {
    let url = "quizzes/results"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            //console.log(resp);
            if (resp.search("ERROR") >= 0) {
                alert("oh no, something is wrong with getting quiz results");
            } else {
                allQuizResults = JSON.parse(resp);
                buildTableBody(JSON.parse(resp));
                // console.log(resp);
                // console.log(allQuizResults);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function clearTable(){
    let theTable = document.querySelector("table");
    theTable.innerHTML = theTable.querySelector("tr").innerHTML;
}

function buildTableBody(allQuizResults) {
    clearTable();
    let theTable = document.querySelector("table");
    let html = theTable.querySelector("tr").innerHTML;

    for (let result of allQuizResults) {
        html += `<tr id="${result.resultID}">`;
        html += `<td>${result.resultID}</td>`;
        html += `<td>${result.user.username}</td>`;
        html += `<td>${result.quiz.quizTitle}</td>`;
        html += `<td>${Math.floor((result.scoreNumerator / result.scoreDenominator) * 100)}%</td>`;
        html += `</tr>`;
    }
    //console.log(theTable);
    theTable.innerHTML = html;
}

function filterTableByTitle() {
    let userTitleInput = document.querySelector("#userTitleInput").value;
    let regex =  new RegExp(userTitleInput);
    let filteredArray = allQuizResults.filter( result => regex.test(result.user.username));
    buildTableBody(filteredArray);
    document.querySelector("#userTitleInput").value = "";
}