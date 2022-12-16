package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {

    private static Connection conn = null;

    /* Note that there is no access modifier (public/private/protected) on the  
     * getConnection method. This means the access level is "package private" 
     * - i.e., accessible only to classes in the same package.
     * So, MenuItemAccessor can call this method, but the servlets can't.
     */ 
    static Connection getConnection(String url, String user, String password) throws SQLException {
        if (conn == null) {
            try {
            conn = DriverManager.getConnection(url, user, password);
            }
            catch (SQLException ex)
            { 
                System.err.println("************************");
                System.err.println("** Error opening DB");
                System.err.println("** " + ex.getMessage());
                System.err.println("************************");
                return null;
            }
        }
        return conn;
    }

} // end class ConnectionManager
