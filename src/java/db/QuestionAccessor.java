
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
    private static PreparedStatement deleteStatement = null;
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
                deleteStatement = conn.prepareStatement("delete from employees where emp_no = ?");
                insertStatement = conn.prepareStatement("insert into employees values (?,?,?,?,?,?)");
                updateStatement = conn.prepareStatement("update employees set birth_date = ?, first_name = ?, last_name = ?, gender = ?, hire_date = ? where emp_no = ?");
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
        List<Question> emps = new ArrayList();
        if(!init())
            return emps;
        ResultSet rs;
        try{
            rs = selectAllStatement.executeQuery();
        } catch(SQLException ex){
            System.err.println("************************");
            System.err.println("** Error retreiving Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
            return emps;
        }
        
        try {
            while (rs.next()) {
                int emp_no = rs.getInt("emp_no");
                String birth_date = rs.getString("birth_date");
                String first_name = rs.getString("first_name");
                String last_name = rs.getString("last_name");
                String gender = rs.getString("gender");
                String hire_date = rs.getString("hire_date");
                //Employee emp = new Employee(emp_no, birth_date, first_name, last_name, gender,hire_date);
                //emps.add(emp);
            }
            //System.out.println("TRIGGERED");
        } catch (SQLException ex) {
            System.err.println("************************");
            System.err.println("** Error populating Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
        }
        return emps;
    }
    
}
