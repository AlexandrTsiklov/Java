package ru.alexting.util;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


// Перехватывает исключения при аутентификации до редиректа на failureUrl


public class TxprAuthErrorsHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String redirectUrl = "/txpr/authorization?error=password";
        if(exception.getClass() == UsernameNotFoundException.class)
            redirectUrl = "/txpr/authorization?error=login";

        super.setDefaultFailureUrl(redirectUrl);
        super.onAuthenticationFailure(request, response, exception);
    }
}
