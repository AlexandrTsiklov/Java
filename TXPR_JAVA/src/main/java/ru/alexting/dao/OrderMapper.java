package ru.alexting.dao;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

import ru.alexting.models.Order;


public class OrderMapper implements RowMapper {

    @Override
    public Order mapRow(ResultSet resultSet, int rowNum) throws SQLException {

        Order order = new Order();

        order.setId(resultSet.getInt("id"));
        order.setOrderFromCity(resultSet.getString("order_from_city"));
        order.setOrderToCity(resultSet.getString("order_to_city"));
        order.setOrderTime(resultSet.getString("order_time"));
        order.setOrderGoods(resultSet.getString("order_goods"));
        order.setOrderPrice(resultSet.getInt("order_price"));
        order.setOrderComment(resultSet.getString("order_comment"));
        order.setOrderGetOrDeliver(resultSet.getString("order_get_or_deliver"));
        order.setOrderWhoTookId(resultSet.getInt("order_who_took_id"));
        order.setOrderWhoWaitId(resultSet.getInt("order_who_wait_id"));
        order.setOrderWhoLeftUsername(resultSet.getString("order_who_left_username"));

        return order;
    }
}