package ru.alexting.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.alexting.dto.UserAuthDTO;
import ru.alexting.models.User;
import ru.alexting.services.TxprRegistrationService;
import ru.alexting.util.PersonNotFoundException;
import ru.alexting.util.UserDTOValidator;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;


@Controller
@RequestMapping("/txpr")
public class AuthController {

    private final UserDTOValidator userDTOValidator;
    private final TxprRegistrationService txprRegistrationService;

    @Autowired
    public AuthController(UserDTOValidator userDTOValidator,
                          TxprRegistrationService txprRegistrationService){
        this.userDTOValidator = userDTOValidator;
        this.txprRegistrationService = txprRegistrationService;
    }

    @GetMapping("/registration")
    public String registrationPage(@ModelAttribute UserAuthDTO userAuthDTO) {
        return "registration";
    }

    @PostMapping("/registration")
    public String register(@ModelAttribute UserAuthDTO userAuthDTO,
                           BindingResult bindingResult,
                           HttpServletRequest request) {

        userDTOValidator.validate(userAuthDTO, bindingResult);
        if (bindingResult.hasErrors())
            return "registration";

        User user = userAuthDTO.convertToUser();
        txprRegistrationService.register(user);
        authenticateUserAndSetSession(user, request);
        return "redirect: /txpr/home";
    }

    private void authenticateUserAndSetSession(User user, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user, user.getPassword(), Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(token);
    }

    @GetMapping("/authorization")
    public String authorizationPage(@ModelAttribute User user,
                                    @RequestParam(value = "error", required = false) String errorField,
                                    BindingResult bindingResult) {

        if(errorField != null) {
            if (errorField.equals("login"))
                bindingResult.rejectValue("username", "", "Такого пользователя не существует!");
            else if (errorField.equals("password"))
                bindingResult.rejectValue("password", "", "Неверный пароль!");
        }

        return "authorization";
    }

}
