package db;

/**
 * It's better practice to store this information in a configuration file.
 */
public class ConnectionParameters {
 
    public static final String URL = "jdbc:derby://localhost:1527/QuizAppDb";
    public static final String USERNAME = "app";
    public static final String PASSWORD = "app";
    
    // no instantiation allowed
    private ConnectionParameters() {}
    
} // end class ConnectionParameters
