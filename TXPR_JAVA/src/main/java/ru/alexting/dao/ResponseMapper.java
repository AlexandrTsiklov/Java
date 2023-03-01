package ru.alexting.dao;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.jdbc.core.RowMapper;
import ru.alexting.models.Response;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ResponseMapper implements RowMapper {

    @Override
    public Response mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        Response response = new Response();

        response.setId(resultSet.getInt("id"));
        response.setResponseToOrderId(resultSet.getInt("response_to_order_id"));
        response.setResponseWhoResponsedTheOrder(resultSet.getInt("response_who_responsed_the_order"));

        return response;
    }
}
