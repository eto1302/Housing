package com.example.Housing.Controllers;

import com.example.Housing.Entities.Photo;
import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.PhotoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://localhost:4202", "http://localhost:4203"})
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
    public ResponseEntity<Photo> addPhoto(@RequestParam("photo") MultipartFile photo) {
        if (photo.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        try {
            Photo savedPhoto = new Photo();
            savedPhoto.setPhoto(photo.getBytes());

            savedPhoto = photoRepository.saveAndFlush(savedPhoto);

            return new ResponseEntity<Photo>(savedPhoto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/photos/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable Long id) {
        Optional<Photo> optionalPhoto = photoRepository.findById(id);
        if (optionalPhoto.isPresent()) {
            Photo photo = optionalPhoto.get();
            return ResponseEntity.ok(photo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/photos/count")
    public int getCount(){
        return getPhotos().size();
    }
}