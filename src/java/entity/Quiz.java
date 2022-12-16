package entity;

import java.util.List;


public class Quiz {
    private String quizID;
    private String  quizTitle;
    private List<Question>  questions; // array of Question objects
    private List<Number> points;
    
    public Quiz(String quizID,String quizTitle,List<Question> questions,List<Number> points){
        this.quizID =quizID;
        this.quizTitle =quizTitle;
        this.questions =questions;
        this.points =points;
    }
    public String getQuizID(){
        return quizID;
    }

    public String getQuizTitle(){
        return quizTitle;
    }

    public List<Question> getQuestions(){
        return questions;
    }

    public List<Number> getPoints(){
        return points;
    }
}
