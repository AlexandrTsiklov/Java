package ru.alexting.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.alexting.models.User;
import ru.alexting.repositories.UserRepository;
import ru.alexting.security.TxprUserDetails;

import java.util.Optional;


@Service
public class TxprUserDetaildService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public TxprUserDetaildService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public TxprUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

        if(user.isEmpty()) {
            throw new UsernameNotFoundException("User not found!");
        }

        return new TxprUserDetails(user.get());
    }

    public User getById(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty())
            throw new UsernameNotFoundException("User not found!");

        return user.get();
    }
}
