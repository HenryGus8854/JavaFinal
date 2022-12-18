/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package db;

import entity.Question;
import entity.Quiz;
import entity.QuizResult;
import entity.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author dudua
 */
public class QuizResultAccessor {

    private static Connection conn = null;
    private static PreparedStatement selectAllStatement = null;
    private static PreparedStatement pointsStatement = null;
    private static PreparedStatement insertStatement = null;
    private static PreparedStatement updateStatement = null;

    private QuizResultAccessor(){}

    private static boolean init() throws SQLException {
        if (conn != null) return true;

        conn = ConnectionManager.getConnection(ConnectionParameters.URL, ConnectionParameters.USERNAME, ConnectionParameters.PASSWORD);
        if (conn != null)
            try{
                selectAllStatement = conn.prepareStatement("select * from quizresult");
                return true;
            }catch(SQLException ex){
                System.err.println("************************");
                System.err.println("** Error preparing SQL");
                System.err.println("** " + ex.getMessage());
                System.err.println("************************");
                conn = null;
            }
        return false;
    }

    public static ArrayList<QuizResult> getAllQuizResults() throws SQLException{
        ArrayList<QuizResult> allQuizResults = new ArrayList<>();
        if(!init()) return allQuizResults;

        ResultSet rs;
        try{
            rs = selectAllStatement.executeQuery();
        } catch(SQLException ex){
            System.err.println("************************");
            System.err.println("** Error retreiving Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
            return allQuizResults;
        }

        try {
            while (rs.next()) {

                String resultID = rs.getString("resultID");
                String quizID = rs.getString("quizID");
                String username = rs.getString("username");
                String[] userAnswers = rs.getString("userAnswers").split("\\|"); //TODO: recheck this part again
                String quizStartTime = rs.getString("quizStartTime");
                String quizEndTime = rs.getString("quizEndTime");
                int scoreNumerator = rs.getInt("scoreNumerator");
                int scoreDenominator = rs.getInt("scoreDenominator");

                Quiz quiz = QuizAccessor.getQuizByID(quizID);
                User user = UserAccessor.getUserByUsername(username);
                List<Number> answers = new ArrayList<>();

                for (String answer : userAnswers) {
                    answers.add(Integer.parseInt(answer));
                }

                QuizResult quizResult = new QuizResult(resultID, quiz, user, answers, quizStartTime, quizEndTime, scoreNumerator, scoreDenominator);
                allQuizResults.add(quizResult);
            }
            System.out.println("TRIGGERED");
        } catch (SQLException ex) {
            System.err.println("************************");
            System.err.println("** Error populating Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
        }
        return allQuizResults;
    }

    
}
