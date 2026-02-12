package com.relink.backend.controller;

import com.relink.backend.dto.LoginRequest;
import com.relink.backend.dto.RegisterRequestDto;
import com.relink.backend.model.Users;
import com.relink.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")

//This controller class is capable of handling http request/ is built to handle http requests
public class UserController {

    private UserService userService;
    //Build add user REST API
    //@PostMapping annotation is used by the below method to map http post request

    @PostMapping
            //("/api/register/users")
    public ResponseEntity<RegisterRequestDto> createUser(@RequestBody RegisterRequestDto userDto){
        RegisterRequestDto savedUser = userService.createUser(userDto);
        //RETURNS 201 created (into a database)
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
        String token = userService.verify(loginRequest);
        return ResponseEntity.ok(token);
    }


    @GetMapping("{id}")
    public ResponseEntity<RegisterRequestDto> getUserById(@PathVariable("id") Long userId){
        RegisterRequestDto userDto = userService.getUserById(userId);
         return ResponseEntity.ok(userDto);
    }

    @GetMapping
    public ResponseEntity<List<RegisterRequestDto>> getAllUsers(){
        List<RegisterRequestDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @PutMapping("{id}")
    public ResponseEntity<RegisterRequestDto> updateUser(@PathVariable("id") Long userId,
                                                         @RequestBody RegisterRequestDto updateUser){

        RegisterRequestDto userDto = userService.updateUser(userId, updateUser);
        return ResponseEntity.ok(userDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){
        userService.deleteUser(userId);

        return ResponseEntity.ok("User with ID: "+ userId +" is deleted successfully!");
    }
}
