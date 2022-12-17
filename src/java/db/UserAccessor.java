
package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import entity.Question;
import entity.User;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UserAccessor {
    private static Connection conn = null;
    private static PreparedStatement selectByQuizIDStatement = null;
    private static PreparedStatement selectAllStatement = null;
    public UserAccessor(){}
    
    private static boolean init() throws SQLException {
        if (conn != null)
            return true;    
        conn = ConnectionManager.getConnection(ConnectionParameters.URL, ConnectionParameters.USERNAME, ConnectionParameters.PASSWORD);
        if (conn != null)
            try{
                selectAllStatement = conn.prepareStatement("select * from QuizAppUser");
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
    
    
    public static boolean ValidateUser(User user) throws SQLException{
        List<User> users = new ArrayList();
        if(!init())
            return false;
        ResultSet rs;
        try{
            rs = selectAllStatement.executeQuery();
        } catch(SQLException ex){
            System.err.println("************************");
            System.err.println("** Error retreiving Employees");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
            return false;
        }
        try {
            while (rs.next()) {
                String username = rs.getString("username");
                String password = rs.getString("password");
                User  usertemp = new User(username, password);
                users.add(usertemp);
            }
            for(int i = 0; i<users.size();i++){
                if(users.get(i).getUsername().equals(user.getUsername())){
                    return users.get(i).getPassword().equals(user.getPassword());
                }
            }
        } catch (SQLException ex) {
            System.err.println("************************");
            System.err.println("** Error finding User");
            System.err.println("** " + ex.getMessage());
            System.err.println("************************");
        }
        return false;
    }
}
