package ru.alexting.models;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "MyOrder")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "order_from_city")
    private String orderFromCity;

    @Column(name = "order_to_city")
    private String orderToCity;

    @Column(name = "order_time")
    private String orderTime;

    @Column(name = "order_goods")
    private String orderGoods;

    @Column(name = "order_price")
    private int orderPrice;

    @Column(name = "order_comment")
    private String orderComment;

    @Column(name = "order_get_or_deliver")
    private String orderGetOrDeliver;

    @Column(name = "order_was_taken")
    private boolean orderWasTaken;

    @Column(name = "order_who_took_id")
    private int orderWhoTookId;

    @Column(name = "order_who_wait_id")
    private int orderWhoWaitId;

    @Column(name = "order_who_left_username")
    private String orderWhoLeftUsername;

    @ManyToOne()
    @JoinColumn(name = "order_who_left_id", referencedColumnName = "id")
    private User owner;

    public Order(){}

    public Order(String orderFromCity, String orderToCity, String orderTime,
                 String orderGoods, int orderPrice, String orderComment,
                 String orderGetOrDeliver) {
        this.orderFromCity = orderFromCity;
        this.orderToCity = orderToCity;
        this.orderTime = orderTime;
        this.orderGoods = orderGoods;
        this.orderPrice = orderPrice;
        this.orderComment = orderComment;
        this.orderGetOrDeliver = orderGetOrDeliver;
    }

    public int getId() {
        return id;
    }

    public void setId(int id){this.id = id; }

    public String getOrderFromCity() {
        return orderFromCity;
    }

    public void setOrderFromCity(String orderFromCity) {
        this.orderFromCity = orderFromCity;
    }

    public String getOrderToCity() {
        return orderToCity;
    }

    public void setOrderToCity(String orderToCity) {
        this.orderToCity = orderToCity;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public String getOrderGoods() {
        return orderGoods;
    }

    public void setOrderGoods(String orderGoods) {
        this.orderGoods = orderGoods;
    }

    public int getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(int orderPrice) {
        this.orderPrice = orderPrice;
    }

    public String getOrderComment() {
        return orderComment;
    }

    public void setOrderComment(String orderComment) {
        this.orderComment = orderComment;
    }

    public String getOrderGetOrDeliver() {
        return orderGetOrDeliver;
    }

    public void setOrderGetOrDeliver(String orderGetOrDeliver) {
        this.orderGetOrDeliver = orderGetOrDeliver;
    }

    public boolean isOrderWasTaken() {
        return orderWasTaken;
    }

    public void setOrderWasTaken(boolean orderWasTaken) {
        this.orderWasTaken = orderWasTaken;
    }

    public int getOrderWhoTookId() {
        return orderWhoTookId;
    }

    public void setOrderWhoTookId(int orderWhoTookId) {
        this.orderWhoTookId = orderWhoTookId;
    }

    public int getOrderWhoWaitId() {
        return orderWhoWaitId;
    }

    public void setOrderWhoWaitId(int orderWhoWaitId) {
        this.orderWhoWaitId = orderWhoWaitId;
    }

    public String getOrderWhoLeftUsername() {
        return orderWhoLeftUsername;
    }

    public void setOrderWhoLeftUsername(String orderWhoLeftUsername) {
        this.orderWhoLeftUsername = orderWhoLeftUsername;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", orderFromCity='" + orderFromCity + '\'' +
                ", orderToCity='" + orderToCity + '\'' +
                ", orderTime=" + orderTime +
                ", orderGoods='" + orderGoods + '\'' +
                ", orderPrice=" + orderPrice +
                ", orderComment='" + orderComment + '\'' +
                ", orderGetOrDeliver='" + orderGetOrDeliver + '\'' +
                ", orderWasTaken=" + orderWasTaken +
                ", orderWhoTookId=" + orderWhoTookId +
                ", orderWhoWaitId=" + orderWhoWaitId +
                '}';
    }
}
