package ru.alexting.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.alexting.models.Order;
import ru.alexting.models.User;
import ru.alexting.services.OrderService;

import java.util.List;


@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/save")
    public ResponseEntity<HttpStatus> takeOrder(@RequestBody Order order, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        orderService.save(order, user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/get-published")
    public List<Order> getPublishedOrders(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        return orderService.getOrdersByUser(user);
    }


    @GetMapping("/find")
    public List<Order> getFoundOrders(Order order, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        return orderService.getOrdersExceptUserId(user.getId(), order.getOrderGetOrDeliver());
    }
}
