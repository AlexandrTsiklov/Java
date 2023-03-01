package ru.alexting.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alexting.dto.ResponseDTO;
import ru.alexting.models.User;
import ru.alexting.services.ResponseService;


@RestController
@RequestMapping("/response")
public class ResponseController {

    private final ResponseService responseService;

    @Autowired
    public ResponseController(ResponseService responseService) {
        this.responseService = responseService;
    }

    @PostMapping("/save")
    public ResponseEntity<HttpStatus> saveResponse(@RequestBody ResponseDTO responseDTO, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        responseService.save(user, responseDTO.convertToResponse());
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
