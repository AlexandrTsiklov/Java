package ru.alexting.services;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionManager;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.ArrayList;
import java.util.List;

import ru.alexting.dao.OrderMapper;
import ru.alexting.models.Order;
import ru.alexting.models.User;
import ru.alexting.repositories.OrderRepository;


@Service
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;
    private final JdbcTemplate jdbcTemplate;
    private final EntityManager entityManager;

    @Autowired
    public OrderService(OrderRepository orderRepository, JdbcTemplate jdbcTemplate, EntityManager entityManager) {
        this.orderRepository = orderRepository;
        this.jdbcTemplate = jdbcTemplate;
        this.entityManager = entityManager;
    }

    @Transactional
    public void save(Order order, User user){
        Session session = entityManager.unwrap(Session.class);

        if(order.getOrderGetOrDeliver().equals("get"))
            order.setOrderWhoWaitId(user.getId());

        order.setOrderWhoLeftUsername(user.getUsername());
        order.setOwner(user);
        orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(User user){
        return orderRepository.findByOwner(user);
    }

    public Order getById(int id){
        return orderRepository.findById(id).get();
    }

    public List<Order> getOrdersExceptUserId(int id, String getOrDeliver){

        String sql = "select * from MyOrder where " +
            "order_who_left_id != ? and order_get_or_deliver != ? and id not in (" +
                "select response_to_order_id from Response where response_who_responsed_the_order = ?);";

        return jdbcTemplate.query(sql, new OrderMapper(), id, getOrDeliver, id);
    }

}
