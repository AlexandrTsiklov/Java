package ru.alexting.models;

import javax.persistence.*;


@Entity
@Table(name = "Response")
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "response_to_order_id")
    private int responseToOrderId;

    @Column(name = "response_who_left_the_order")
    private int responseWhoLeftTheOrder;

    @Column(name = "response_who_responsed_the_order")
    private int responseWhoResponsedTheOrder;

    @Column(name = "response_get_or_deliver")
    private String responseGetOrDeliver;

    @Column(name = "response_was_watched")
    private boolean responseWasWatched;

    @Column(name = "response_cover_letter")
    private String responseCoverLetter;

    public Response() {}

    public Response(int orderId, String responseCoverLetter) {
        this.responseToOrderId = orderId;
        this.responseCoverLetter = responseCoverLetter;
    }

    public Response(int id, int responseToOrderId, int responseWhoLeftTheOrder, int responseWhoResponsedTheOrder,
                    String responseGetOrDeliver, boolean responseWasWatched,
                    String responseCoverLetter) {
        this.id = id;
        this.responseToOrderId = responseToOrderId;
        this.responseWhoLeftTheOrder = responseWhoLeftTheOrder;
        this.responseWhoResponsedTheOrder = responseWhoResponsedTheOrder;
        this.responseGetOrDeliver = responseGetOrDeliver;
        this.responseWasWatched = responseWasWatched;
        this.responseCoverLetter = responseCoverLetter;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getResponseToOrderId() {
        return responseToOrderId;
    }

    public void setResponseToOrderId(int responseToOrderId) {
        this.responseToOrderId = responseToOrderId;
    }

    public int getResponseWhoLeftTheOrder() {
        return responseWhoLeftTheOrder;
    }

    public void setResponseWhoLeftTheOrder(int responseWhoLeftTheOrder) {
        this.responseWhoLeftTheOrder = responseWhoLeftTheOrder;
    }

    public int getResponseWhoResponsedTheOrder() {
        return responseWhoResponsedTheOrder;
    }

    public void setResponseWhoResponsedTheOrder(int responseWhoResponsedTheOrder) {
        this.responseWhoResponsedTheOrder = responseWhoResponsedTheOrder;
    }

    public String getResponseGetOrDeliver() {
        return responseGetOrDeliver;
    }

    public void setResponseGetOrDeliver(String responseGetOrDeliver) {
        this.responseGetOrDeliver = responseGetOrDeliver;
    }

    public boolean isResponseWasWatched() {
        return responseWasWatched;
    }

    public void setResponseWasWatched(boolean responseWasWatched) {
        this.responseWasWatched = responseWasWatched;
    }

    public String getResponseCoverLetter() {
        return responseCoverLetter;
    }

    public void setResponseCoverLetter(String responseCoverLetter) {
        this.responseCoverLetter = responseCoverLetter;
    }

    @Override
    public String toString() {
        return "Response{" +
                "id=" + id +
                ", responseToOrderId=" + responseToOrderId +
                ", responseWhoLeftTheOrder=" + responseWhoLeftTheOrder +
                ", responseWhoResponsedTheOrder=" + responseWhoResponsedTheOrder +
                ", responseGetOrDeliver='" + responseGetOrDeliver + '\'' +
                ", responseWasWatched=" + responseWasWatched +
                ", responseCoverLetter='" + responseCoverLetter + '\'' +
                '}';
    }
}
