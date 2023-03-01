package ru.alexting.dto;

import ru.alexting.models.User;


public class UserAuthDTO {

    private String username;
    private String password1;
    private String password2;

    public String getUsername() {
        return username;
    }

    public User convertToUser(){
        return new User(username, password1);
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword1() {
        return password1;
    }

    public void setPassword1(String password1) {
        this.password1 = password1;
    }

    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }
}
