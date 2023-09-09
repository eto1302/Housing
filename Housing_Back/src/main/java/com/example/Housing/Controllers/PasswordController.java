package com.example.Housing.Controllers;

import org.hibernate.dialect.lock.PessimisticWriteSelectLockingStrategy;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PasswordController {
    private static String pwd;
    private LocalTime lastRequest;
    public static void generatePassword() {
        List rules = Arrays.asList(new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1), new CharacterRule(EnglishCharacterData.Digit, 1),new CharacterRule(EnglishCharacterData.Special, 1));

        PasswordGenerator generator = new PasswordGenerator();
        pwd = generator.generatePassword(16, rules);
        System.out.println(pwd);
    }

    @PostMapping("/password")
    @ResponseBody
    public boolean checkPassword(@RequestBody String passwordTry){
        System.out.println("Trying password: " + passwordTry);
        /*if(lastRequest != null && lastRequest.getSecond() - LocalTime.now().getSecond() < 5){
            System.out.println("Not waited long enough!");
            lastRequest = LocalTime.now();
            return false;
        }
        else {*/
            lastRequest = LocalTime.now();
            System.out.println(passwordTry.equals(pwd));
            return passwordTry.equals(pwd);
//        }
    }
}
