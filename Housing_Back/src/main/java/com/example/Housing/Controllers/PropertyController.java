package com.example.Housing.Controllers;

import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.PropertyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PropertyController {

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    private final PropertyRepository propertyRepository;

    @GetMapping("/properties")
    public List<Property> getProperties() {
        return propertyRepository.findAll();
    }

    @PostMapping("/properties")
    void addProperty(@RequestBody Property property) {
        propertyRepository.save(property);
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


}