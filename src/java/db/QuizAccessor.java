/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import entity.Quiz;
import entity.Question;
import db.QuestionAccessor;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class QuizAccessor {
    private static Connection conn = null;
    private static PreparedStatement selectAllStatement = null;
    private static PreparedStatement pointsStatement = null;
    private static PreparedStatement insertStatement = null;
    private static PreparedStatement updateStatement = null;
    
    private QuizAccessor(){}
    
    private static boolean init() throws SQLException {
        if (conn != null)
            return true;    
        conn = ConnectionManager.getConnection(ConnectionParameters.URL, ConnectionParameters.USERNAME, ConnectionParameters.PASSWORD);
        if (conn != null)
            try{
                selectAllStatement = conn.prepareStatement("select * from quiz");
                pointsStatement = conn.prepareStatement("select points from QuizQuestion where quizID = ?");
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
    
    public static List<Quiz> getAllQuizzes() throws SQLException{
        List<Quiz> quizzes = new ArrayList();
        if(!init())
            return quizzes;
        ResultSet rs;
        try{
            rs = selectAllStatement.executeQuery();
        } catch(SQLException ex){
            System.err.println("************************");
            System.err.println("** Error retreiving Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
            return quizzes;
        }
        QuestionAccessor questionAcc = new QuestionAccessor();
        try {
            while (rs.next()) {
                String quizID = rs.getString("quizID");
                String quizTitle = rs.getString("quizTitle");
                List<Question> questions = questionAcc.getQuestionsForQuiz(quizID);
                List<Number> points = getPointsForQuiz(quizID);
                Quiz  quiz = new Quiz(quizID, quizTitle, questions, points);
                quizzes.add(quiz);
            }
            System.out.println("TRIGGERED");
        } catch (SQLException ex) {
            System.err.println("************************");
            System.err.println("** Error populating Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
        }
        return quizzes;
    }
    
    private static List<Number> getPointsForQuiz(String quizID)throws SQLException{
        List<Number> points = new ArrayList();
         ResultSet rs;
        try{
            init();
            pointsStatement.setString(1,quizID);
            rs =  pointsStatement.executeQuery();
            while(rs.next()){
                points.add(rs.getInt("points"));
            }
        }catch(SQLException ex){
            System.err.println("************************");
            System.err.println("** Error retreiving Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
            return points; 
        }
        return points;
    }
}
