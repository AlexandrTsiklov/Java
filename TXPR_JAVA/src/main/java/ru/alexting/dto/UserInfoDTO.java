package ru.alexting.dto;

import ru.alexting.models.User;


public class UserInfoDTO  {

    private float rating;
    private String username;

    public UserInfoDTO(User user){
        this.rating = user.getRating();
        this.username = user.getUsername();
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "UserInfoDTO{" +
                "rating=" + rating +
                ", username='" + username + '\'' +
                '}';
    }
}
