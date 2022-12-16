package entity;

public class Question {
    private String questionID;
    private String questionText;
    private String[] choices;
    private int answer;
    private String[] tags;
    
    public Question(String questionID,String questionText,String[] choices, int answer,String[] tags){
        this.questionID =questionID;
        this.questionText =questionText;
        this.choices =choices;
        this.answer =answer;
        this.tags =tags;    
    }
    public String getQuestionID(){
        return questionID;
    }
    public String getQuestionText(){
        return questionText;
    }
    public String[] getChoices(){
        return choices;
    }
    public int getAnswer(){
        return answer;
    }
    public String[] getTags(){
        return tags;
    }
    
}
