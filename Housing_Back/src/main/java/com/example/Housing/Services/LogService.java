package com.example.Housing.Services;

import com.example.Housing.Entities.Log;
import com.example.Housing.Repositories.LogRepository;
import org.springframework.stereotype.Service;

@Service
public class LogService {
    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public void saveLog(Log log){
        this.logRepository.save(log);
    }
}
