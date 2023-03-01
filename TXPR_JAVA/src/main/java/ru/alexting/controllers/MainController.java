package ru.alexting.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.alexting.dto.UserInfoDTO;
import ru.alexting.models.User;
import ru.alexting.services.OrderService;


@Controller
@RequestMapping("/txpr")
public class MainController {

    private final OrderService orderService;

    @Autowired
    public MainController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/user-info/{id}")
    @ResponseBody
    public UserInfoDTO getUserInfo(@PathVariable int id){
        User user = orderService.getById(id).getOwner();
        return new UserInfoDTO(user);
    }

    @GetMapping("/home")
    public String homePage(Model model, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        model.addAttribute("user", user);
        return "home";
    }

    @GetMapping("/make-order")
    public String makeOrderPage(Model model, Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        model.addAttribute("user", user);

        return "make_order";
    }
}
