package entity;

import java.util.List;

public class Question {
    private String questionID;
    private String questionText;
    private String[] choices;
    private int answer;
    
    public Question(String questionID,String questionText, String[] choices, int answer){
        this.questionID =questionID;
        this.questionText =questionText;
        this.choices =choices;
        this.answer =answer;   
    }
    public String getQuestionID(){
        return questionID;
    }
    public String getQuestionText(){
        return questionText;
    }
    public  String[] getChoices(){
        return choices;
    }
    public int getAnswer(){
        return answer;
    }
}
