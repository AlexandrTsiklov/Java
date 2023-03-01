package ru.alexting.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "MyUser")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "rating")
    private float rating;

    @Column(name = "number_of_reviews")
    private int numberOfReviews;

    // @OneToMany(mappedBy = "targetUser")
    // private List<Review> reviews;

    @JsonBackReference
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private List<Order> orders;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, float rating, int numberOfReviews) {
        this.username = username;
        this.password = password;
        this.rating = rating;
        this.numberOfReviews = numberOfReviews;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(int numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

//    public List<Review> getReviews() {
//        return reviews;
//    }

//    public void setReviews(List<Review> reviews) {
//        this.reviews = reviews;
//    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", rating=" + rating +
                ", numberOfReviews=" + numberOfReviews +
                '}';
    }
}
