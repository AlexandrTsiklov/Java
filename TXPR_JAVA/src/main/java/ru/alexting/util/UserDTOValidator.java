package ru.alexting.util;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.alexting.dto.UserAuthDTO;


@Component
public class UserDTOValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return UserAuthDTO.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserAuthDTO userAuthDTO = (UserAuthDTO) target;

        if(!userAuthDTO.getPassword1().equals(userAuthDTO.getPassword2()))
            errors.rejectValue("password1", "", "Пароли не совпадают!");
    }
}
