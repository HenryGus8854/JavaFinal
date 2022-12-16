
package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import entity.Question;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class QuestionAccessor {
    
    private static Connection conn = null;
    private static PreparedStatement selectAllStatement = null;
    private static PreparedStatement selectByQuizIDStatement = null;
    private static PreparedStatement insertStatement = null;
    private static PreparedStatement updateStatement = null;
    
    public QuestionAccessor(){}
    
    private static boolean init() throws SQLException {
        if (conn != null)
            return true;    
        conn = ConnectionManager.getConnection(ConnectionParameters.URL, ConnectionParameters.USERNAME, ConnectionParameters.PASSWORD);
        if (conn != null)
            try{
                selectAllStatement = conn.prepareStatement("select * from quiz");
                selectByQuizIDStatement = conn.prepareStatement("select questionID, questionText, choices, answer from QuizQuestion join Question using(questionID) where quizID = ?");
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
    
    public static List<Question> getQuestionsForQuiz(String quizID) throws SQLException{
        List<Question> questions = new ArrayList();
        if(!init())
            return questions;
        ResultSet rs;
        try{
             selectByQuizIDStatement.setString(1, quizID);
            rs = selectByQuizIDStatement.executeQuery();
        } catch(SQLException ex){
            System.err.println("************************");
            System.err.println("** Error retreiving Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
            return questions;
        }
        
        try {
            while (rs.next()) {
                String questionID = rs.getString("questionID");
                String questionText = rs.getString("questionText");
                String temp =rs.getString("choices");
                String[]  choices = temp.split("\\|");
                int answer = rs.getInt("answer");
                Question quest = new Question(questionID, questionText, choices, answer);
                questions.add(quest);
            }
            //System.out.println("TRIGGERED");
        } catch (SQLException ex) {
            System.err.println("************************");
            System.err.println("** Error populating Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
        }
        return questions;
    }
    
}
