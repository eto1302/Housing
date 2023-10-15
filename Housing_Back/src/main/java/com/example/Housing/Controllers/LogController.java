package com.example.Housing.Controllers;

import com.example.Housing.Entities.Log;
import com.example.Housing.Repositories.LogRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LogController {
    private LogRepository logRepository;

    public LogController(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @GetMapping("/logs")
    public List<Log> getLogs() {
        return logRepository.findAll();
    }
}
