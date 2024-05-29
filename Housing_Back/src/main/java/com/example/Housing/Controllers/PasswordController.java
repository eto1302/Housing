package com.example.Housing.Controllers;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://localhost:4202", "http://localhost:4203"})
public class PasswordController {
    private static String pwd;
    private final long jwtExpirationInMinutes = 90;
    private static String jwtSecret;

    public static void generatePassword() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] secretBytes = new byte[32];
        secureRandom.nextBytes(secretBytes);
        jwtSecret = Base64.getEncoder().encodeToString(secretBytes);

        List<CharacterRule> rules = Arrays.asList(new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1), new CharacterRule(EnglishCharacterData.Digit, 1), new CharacterRule(EnglishCharacterData.Special, 1));

        PasswordGenerator generator = new PasswordGenerator();
        pwd = generator.generatePassword(16, rules);
        System.out.println(pwd);
    }

    @PostMapping("/password")
    @ResponseBody
    public ResponseEntity<String> checkPassword(@RequestBody String passwordTry) {
        System.out.println("Trying password: " + passwordTry);

        if (passwordTry.equals(pwd)) {
            String jwtToken = generateJwtToken();
            return ResponseEntity.ok(jwtToken);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    private String generateJwtToken() {
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        Date expiration = Date.from(Instant.now().plus(Duration.ofMinutes(jwtExpirationInMinutes)));

        return Jwts.builder()
                .setSubject("your-subject") // Customize this
                .setIssuedAt(new Date())
                .setExpiration(expiration)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
