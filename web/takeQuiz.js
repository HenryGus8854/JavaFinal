
window.onload = function () {
    getCurrentQuiz();
};

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
//TODO: filter on the backend





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


