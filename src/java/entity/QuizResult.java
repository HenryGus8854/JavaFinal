package entity;

public class QuizResult {
    private String resultID;
    private Quiz quiz;
    private User user; // 
    private int[] answers; //int[]
    private String startTime;
    private String endTime;
    private int scoreNumerator;
    private int scoreDenominator;

    public QuizResult(String resultID, Quiz quiz, User user,  int[] answers,String startTime, String endTime, int scoreNumerator, int scoreDenominator) {
        this.resultID = resultID;
        this.quiz = quiz;
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.answers = answers;
        this.scoreNumerator = scoreNumerator;
        this.scoreDenominator = scoreDenominator;
    }

    public String getResultID(){
        return resultID;
    }

    public Quiz getQuiz(){
        return quiz;
    }

    public User getUser() {
        return user;
    }

    public String getQuizStartTime(){
        return startTime;
    }

    public String getQuizEndTime(){
        return endTime;
    }

    public int[] getUserAnswers(){
        return answers;
    }

    public int getScoreNumerator(){
        return scoreNumerator;
    }

    public int getScoreDenominator(){
        return scoreDenominator;
    }
}
