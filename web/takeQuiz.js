let curQuiz; 
let username = null;
let start = null;
let numOfResults =0;
window.onload = function () {
    confirmUser();
    start = getTime();
    getNumberOfResults();
}
function getTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    console.log(dateTime);
    return dateTime;
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
                getCurrentQuiz();
                adjustNavbar();
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}
function getCurrentQuiz(){
    let url = "CurrentQuiz"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            //console.log("-->"+resp);
            if (resp.search("ERROR") >= 0) {
                alert("Something is wrong with the GET.");
            } else {
                curQuiz = JSON.parse(resp);
                buildQuiz();
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getUser(){
    let url = "account/user"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            //console.log("-->"+resp);
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

function buildQuiz(){
    //let quiz = JSON.parse(curQuiz);
    console.log(curQuiz);
    if(curQuiz === null) window.location.href="index.html";
        
    let header = document.querySelector('h1');
    let container = document.querySelector('#mainContainer');
    let html = container.innerHTML;
    
    header.innerText = curQuiz.quizTitle;
    for(let i =0;i<curQuiz.questions.length;i++){
        let tempQuestion = curQuiz.questions[i];
        html+=`<div class="container mb-3 border rounded">
                        <h2>Question ${i+1} : ${tempQuestion.questionID}</h2>
                        <p>${tempQuestion.questionText}</p>
                        ${tempQuestion.choices.map(choice => `<input type="radio" name="${tempQuestion.questionID}" value="${choice}">
                            <label class='p-2' for='"${tempQuestion.questionID}"'>${choice}</label><br>`).join('')}`;
        html += "</div>";     
    }
    html+=`<button type="submit"  id="submitQuiz" class="btn btn-primary ">Submit</button>`;
    container.innerHTML = html;
    document.querySelector("#submitQuiz").addEventListener("click",makeQuizResult);
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

function getNumberOfResults(){
    let url = "quizzes/results"; // file name or server-side process name
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            //console.log("-->"+resp);
            if (resp.search("ERROR") >= 0) {
                alert("Something is wrong with the Logout.");
            } else {
                numOfResults=JSON.parse(resp).length;
                console.log(numOfResults);
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function makeQuizResult(){
    let res = GrabAllAnswers();
    console.log(res);
    if(res.length<curQuiz.questions.length)
        alert("Please answer all questions!!");
    else{
        let counter = 0;
        let quizID="QR-1"+(numOfResults+1); 
        let user = {
            "username": username,
            "password": "dummy"
        }
        for(let i =0;i<res.length;i++){
            if(curQuiz.questions[i].answer === res[i]){
                counter++;
            }
        }
        //QuizResult(quizID,quiz,user,answers,startTime,endTime,scoreNumerator,scoreDenominator);
        let quizResult ={
            "resultID": quizID,
            "quiz":curQuiz,
            "user": user,
            "answers":res,
            "startTime": start,
            "endTime": getTime(),
            "scoreNumerator": counter,
            "scoreDenominator":res.length
        }
        console.log(quizResult);
        let url = "quizzes/results"; // file name or server-side process name
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let resp = xmlhttp.responseText;
                console.log("-->"+resp);
                if (resp.search("ERROR") >= 0) {
                    alert("Something is wrong with the Logout.");
                } else {
                        window.location.href = "quizResults.html";
                }

            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.send(JSON.stringify(quizResult));
    }
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



