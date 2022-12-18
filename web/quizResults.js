let allQuizResults = [];

window.onload = function () {
    getAllQuizResults();
};

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
                console.log(resp);
                allQuizResults = JSON.parse(resp);
                buildTableBody(JSON.parse(resp));
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

