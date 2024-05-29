package com.example.Housing.Controllers;

import com.example.Housing.Entities.Log;
import com.example.Housing.Entities.Photo;
import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.LogRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://localhost:4202", "http://localhost:4203"})
public class LogController {
    private LogRepository logRepository;

    public LogController(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @GetMapping("/logs")
    public List<Log> getLogs() {
        return logRepository.findAll();
    }

    @GetMapping("/logs/{id}")
    public ResponseEntity<Log> getLogById(@PathVariable Long id) {
        Optional<Log> optionalLog = logRepository.findById(id);
        if (optionalLog.isPresent()) {
            Log log = optionalLog.get();
            return ResponseEntity.ok(log);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/logs")
    ResponseEntity<Log> addLog(@RequestBody Log log) {
        try {
            log.setDate(new Date(System.currentTimeMillis() + TimeZone.getTimeZone("Europe/Sofia").getRawOffset()));
            Log savedlog = logRepository.saveAndFlush(log);
            return new ResponseEntity<>(savedlog, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
