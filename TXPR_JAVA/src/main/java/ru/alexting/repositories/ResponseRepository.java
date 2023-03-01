package ru.alexting.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alexting.models.Response;


@Repository
public interface ResponseRepository extends JpaRepository<Response, Integer> {
}
