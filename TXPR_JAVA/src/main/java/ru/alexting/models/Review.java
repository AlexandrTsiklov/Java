package ru.alexting.models;

import javax.persistence.*;


@Entity
@Table(name = "Review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "review_text")
    private String reviewText;

    @Column(name = "review_who_left_id")
    private int reviewWhoLeftId;

    @Column(name = "review_who_left_username")
    private String reviewWhoLeftUsername;

//    @ManyToOne
//    @JoinColumn(name = "review_for_user_id", referencedColumnName = "id")
//    private User targetUser;


    public Review() {
    }

    public Review(String reviewText, int reviewWhoLeftId, String reviewWhoLeftUsername) { // User targetUser) {
        this.reviewText = reviewText;
        this.reviewWhoLeftId = reviewWhoLeftId;
        this.reviewWhoLeftUsername = reviewWhoLeftUsername;
        // this.targetUser = targetUser;
    }

    public int getId() {
        return id;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public int getReviewWhoLeftId() {
        return reviewWhoLeftId;
    }

    public void setReviewWhoLeftId(int reviewWhoLeftId) {
        this.reviewWhoLeftId = reviewWhoLeftId;
    }

    public String getReviewWhoLeftUsername() {
        return reviewWhoLeftUsername;
    }

    public void setReviewWhoLeftUsername(String reviewWhoLeftUsername) {
        this.reviewWhoLeftUsername = reviewWhoLeftUsername;
    }

//    public User getTargetUser() {
//        return targetUser;
//    }
//
//    public void setTargetUser(User targetUser) {
//        this.targetUser = targetUser;
//    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", reviewText='" + reviewText + '\'' +
                ", reviewWhoLeftId=" + reviewWhoLeftId +
                ", reviewWhoLeftUsername='" + reviewWhoLeftUsername + '\'' +
                // ", targetUser=" + targetUser +
                '}';
    }
}
