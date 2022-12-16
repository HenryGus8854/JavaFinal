package entity;


public class Quiz {
    private String quizID;
    private String  quizTitle;
    private Question[]  questions; // array of Question objects
    private int[]  points;
    
    public Quiz(String quizID,String quizTitle,Question[] questions,int[] points){
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

    public Question[] getQuestions(){
        return questions;
    }

    public int[] getPoints(){
        return points;
    }
}
