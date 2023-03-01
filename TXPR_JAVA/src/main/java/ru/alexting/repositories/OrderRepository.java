package ru.alexting.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alexting.models.User;
import ru.alexting.models.Order;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByOwner(User user);

}
