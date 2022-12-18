package entity;

import java.util.List;

public class QuizResult {
    private final String resultID;
    private final Quiz quiz;
    private final User user; //
    private final List<Number> answers; //int[]
    private final String startTime;
    private final String endTime;
    private final int scoreNumerator;
    private final int scoreDenominator;

    public QuizResult(String resultID, Quiz quiz, User user, List<Number> answers,String startTime, String endTime, int scoreNumerator, int scoreDenominator) {
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

    public List<Number> getUserAnswers(){
        return answers;
    }

    public int getScoreNumerator(){
        return scoreNumerator;
    }

    public int getScoreDenominator(){
        return scoreDenominator;
    }
}
