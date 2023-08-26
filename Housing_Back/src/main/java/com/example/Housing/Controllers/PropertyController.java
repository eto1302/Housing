package com.example.Housing.Controllers;

import com.example.Housing.Entities.Photo;
import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.PhotoRepository;
import com.example.Housing.Repositories.PropertyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PropertyController {

    public PropertyController(PropertyRepository propertyRepository, PhotoRepository photoRepository) {
        this.propertyRepository = propertyRepository;
        this.photoRepository = photoRepository;
    }

    private final PropertyRepository propertyRepository;
    private final PhotoRepository photoRepository;

    @GetMapping("/properties")
    public List<Property> getProperties() {
        return propertyRepository.findAll();
    }

    @PostMapping("/properties")
    public ResponseEntity<Property> addProperty(@RequestBody Property property) {
        try{
            Property savedProperty = propertyRepository.save(property);
            return new ResponseEntity<>(savedProperty, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/properties/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> optionalProperty = propertyRepository.findById(id);
        if (optionalProperty.isPresent()) {
            Property property = optionalProperty.get();
            return ResponseEntity.ok(property);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/properties/count")
    public int getCount(){
        return getProperties().size();
    }

    @GetMapping("/properties/{begin}/{end}")
    public List<Property> getPropertiesInRange(@PathVariable Long begin, @PathVariable Long end){
        List<Property> result = new ArrayList<>();
        for(Long i = begin; i < end; ++i){
            var property = propertyRepository.findById(i);
            property.ifPresent(result::add);
        }
        return result;
    }
    @PostMapping("/properties/setPhotos/{id}")
    public ResponseEntity<Property> setPhotos(@PathVariable Long id, @RequestBody int[] photoIds) {
        try{
            Property property = propertyRepository.findById(id).get();
            for(int photoId : photoIds){
                Photo photo = this.photoRepository.findById((long) photoId).get();
                property.addPhoto(photo);
            }
            property = propertyRepository.save(property);
            return new ResponseEntity<>(property, HttpStatus.OK);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}