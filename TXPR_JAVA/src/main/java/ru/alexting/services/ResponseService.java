package ru.alexting.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alexting.models.Response;
import ru.alexting.models.User;
import ru.alexting.repositories.ResponseRepository;


@Service
@Transactional
public class ResponseService {

    private final ResponseRepository responseRepository;

    @Autowired
    public ResponseService(ResponseRepository responseRepository) {
        this.responseRepository = responseRepository;
    }

    public void save(User whoResponsed, Response response){
        response.setResponseWhoResponsedTheOrder(whoResponsed.getId());
        responseRepository.save(response);
    }

}
