package com.example.Housing.Controllers;

import com.example.Housing.Entities.Photo;
import com.example.Housing.Repositories.PhotoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PhotoController {

    public PhotoController(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    private final PhotoRepository photoRepository;

    @GetMapping("/photos")
    public List<Photo> getPhotos() {
        return photoRepository.findAll();
    }

    @PostMapping("/photos")
    void addPhoto(@RequestBody Photo property) {
        photoRepository.save(property);
    }
}