let curQuiz; 
window.onload = function () {
    getCurrentQuiz();
    
};

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

function makeQuizResult(){
    let res = GrabAllAnswers();
    console.log(res);
    if(res.length<curQuiz.questions.length)
        alert("Please answer all questions!!");
    else{
        
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



