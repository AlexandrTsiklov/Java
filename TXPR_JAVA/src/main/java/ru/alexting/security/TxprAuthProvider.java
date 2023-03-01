package ru.alexting.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.alexting.models.User;
import ru.alexting.services.TxprUserDetaildService;

import java.util.Collections;


@Component
public class TxprAuthProvider implements AuthenticationProvider {

    private final TxprUserDetaildService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public TxprAuthProvider(TxprUserDetaildService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();

        User user = userService.loadUserByUsername(username).getUser();
        String password = authentication.getCredentials().toString();

        if(!passwordEncoder.matches(password, user.getPassword()))
            throw new BadCredentialsException("Wrong password!");

        return new UsernamePasswordAuthenticationToken(user, password, Collections.emptyList());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
