let allQuizzes =[];
let userobj;
let quizBeingTaken;
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

        getUser();
        getAllQuizes();
        getCatergories();
    }
    
};
function getUser(){
    let url = "account/user"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            console.log("-->"+resp);
            if (resp.search("ERROR") >= 0) {
                alert("Something is wrong with the GET.");
            } else {
                userobj=resp;
                //pagePermission(userobj);
                //console.log(typeof userobj)
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
    let user = JSON.parse(userobj);
    if(user.permissionLevel === "GUEST"){
        html += "<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link active\" aria-current=\"page\" href=\"loginPage.html\">Log In</a>\n" +
                "</li>\n" +
                "<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link\" href=\"signupPage.php\">Sign Up</a>\n" +
                "</li>";
    }else{
        html += "<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link active\" aria-current=\"page\" href=\"quizResults.html\">Quiz Results</a>\n" +
                "</li>\n" +
                "<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link active\" href='' aria-current=\"page\" onclick='logout()'>Logout</a>\n" +
                "</li>\n";
                if(user.permissionLevel === "ADMIN")
                {
                    html +="<li class=\"nav-item\">\n" +
                        "<a class=\"nav-link active\" aria-current=\"page\" href=\"HomePages/AdminHomePage.php\">Admin Homepage</a>\n" +
                        "</li>\n";
                }
        html +="<li class=\"nav-item\">\n" +
                    "<a class=\"nav-link\" aria-current=\"page\">"+user.username.toLocaleUpperCase()+"</a>\n" +
                "</li>";

    }
    thenav.innerHTML=html;
}

function logout(){
    let url = "account/user"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            console.log("-->"+resp);
            if (resp.search("ERROR") >= 0) {
                alert("Something is wrong with the Logout.");
            } else {
                window.location.replace("http://localhost/Projects/Final_Project/index.php");
            }

        }
    };
    console.log(url);
    xmlhttp.open("DELETE", url, true);
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

function getCatergories(){
    let url="quizapp/catergory";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            //console.log(resp);
            if (resp.search("ERROR") >= 0) {
                alert("oh no, something is wrong with the GET ...");
            } else {
                //buildTable(resp);
                let select = document.getElementById("quizTagsSelect");
                let html = select.innerHTML;
                let arr = JSON.parse(resp);
                html+="<option>Choose a tag</option>";
                for(let i = 0; i < arr.length; i++){
                    let row = arr[i];
                    html+="<option value='"+row.tagName+"'>"+row.tagName.split('::')[1]+"</option>";
                    //console.log(row);
                }
                select.innerHTML =html;
            }
        }
    };
    console.log(url);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

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
    document.querySelector(".takeQuiz").addEventListener("click",takeQuiz);
}

function filterTableByTitle() {
    let userTitleInput = document.querySelector("#userTitleInput").value;
    let regex =  new RegExp(userTitleInput);
    let filteredArray = allQuizzes.filter( quiz => regex.test(quiz.quizTitle));
    buildTableBody(filteredArray);
    document.querySelector("#userTitleInput").value = "";

}


function buildFilteredTable() {
    let tag = document.querySelector("#quizTagsSelect").value;
    alert(tag);
}
function getQuizzesByTag(){

    let tagBar = document.getElementById("tagSearch");
    let p = tagBar.querySelector('#tags');
    let html = p.innerHTML;
    p.innerHTML= "";
    //console.log(html);
    let arr = html.split(',');
    console.log(arr.length);
    console.log(arr);
    let url = "quizapp/quizzes/search:tags=";
    
    //This if else checks if Tags have been selected 
    //And Then checks if there are mutiple tags 
    //And makes a differ query based on the amout of tags
    if(arr.length === 1 && arr[0]===""){
        alert("Please select Some Tags");
    }else if(arr.length>1){
        for(let i=0; i<arr.length;i++){
            url+=arr[i]+",";
        }
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let resp = xmlhttp.responseText;
                console.log(resp);
                if (resp.search("ERROR") >= 0) {
                    alert("oh no, something is wrong with the GET ...");
                } else {
                    buildTable(resp);
                }
            }
        };
        console.log(url);
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }else {
        url+=arr[0]+"";
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let resp = xmlhttp.responseText;
                console.log(resp);
                if (resp.search("ERROR") >= 0) {
                    alert("oh no, something is wrong with the GET ...");
                } else {
                    
                    buildTable(resp);
                }
            }
        };
        console.log(url);
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    
}


function takeQuiz(e){
   let parent =  e.target.parentElement;
   let input = parent.firstChild.valueOf();
   //console.log(input.value);
   //console.log(allQuizzes);
   for(let i = 0; i<allQuizzes.length; i++){
       if(allQuizzes[i].quizID === input.value){
           console.log(allQuizzes[i].quizID);
           quizBeingTaken = allQuizzes[i];

       }
   }
    console.log(quizBeingTaken);
}

function buildQuiz(){

}