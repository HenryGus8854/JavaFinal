package entity;
public class User {
    private String username;
    private String password;
    private String permissionLevel;

    public User(String username, String password, String permissionLevel){
        this.username = username;
        this.password = password;
        this.permissionLevel = permissionLevel;
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
