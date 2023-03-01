package ru.alexting.dto;


import ru.alexting.models.Response;


public class ResponseDTO {

    private int orderId;
    private String responseCoverLetter;

    public ResponseDTO() {
    }

    public ResponseDTO(int orderId, String responseCoverLetter) {
        this.orderId = orderId;
        this.responseCoverLetter = responseCoverLetter;
    }

    public Response convertToResponse(){
        return new Response(orderId, responseCoverLetter);
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getResponseCoverLetter() {
        return responseCoverLetter;
    }

    public void setResponseCoverLetter(String responseCoverLetter) {
        this.responseCoverLetter = responseCoverLetter;
    }

    @Override
    public String toString() {
        return "ResponseDTO{" +
                "orderId=" + orderId +
                ", responseCoverLetter='" + responseCoverLetter + '\'' +
                '}';
    }
}
