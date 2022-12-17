package entity;
public class User {
    private String username;
    private String password;
    private String permissionLevel = "USER";

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    public String getUsername()
    {
        return username;
    }

    public String getPassword()
    {
        return password;
    }

    public String getPermissionLevel()
    {
        return permissionLevel;
    }
}
