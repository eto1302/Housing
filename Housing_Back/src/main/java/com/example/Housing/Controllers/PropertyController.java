package com.example.Housing.Controllers;

import com.example.Housing.Entities.Photo;
import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.PhotoRepository;
import com.example.Housing.Repositories.PropertyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
        try {
            Property savedProperty = propertyRepository.save(property);
            return new ResponseEntity<>(savedProperty, HttpStatus.OK);
        } catch (Exception e) {
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
    public int getCount() {
        return getProperties().size();
    }

    @GetMapping("/properties/{begin}/{end}")
    public List<Property> getPropertiesInRange(@PathVariable Long begin, @PathVariable Long end) {
        List<Property> result = new ArrayList<>();
        for (Long i = begin; i < end; ++i) {
            var property = propertyRepository.findById(i);
            property.ifPresent(result::add);
        }
        return result;
    }

    @PostMapping("/properties/{begin}/{end}")
    public List<Property> getPropertiesInRange(
            @PathVariable Long begin,
            @PathVariable Long end,
            @RequestBody Map<String, Object> requestBody) {
        System.out.println("Getting properties between " + begin + " and " + end);

        // Extract the 'queries' array from the request body
        List<String> queries = (ArrayList<String>)requestBody.get("queries");
        if(queries == null || queries.stream().allMatch(Objects::isNull)) return getPropertiesInRange(begin, end);
        System.out.println("Using queries: " + String.join(", ", queries));

        List<Property> result = new ArrayList<>();


        for (Long i = begin; i < end; ++i) {
            if(end >= this.getCount()) break;
            var property = propertyRepository.findById(i);

            // Check if the property matches the query criteria
            if (property.isPresent() && shouldIncludeProperty(property.get(), queries)) {
                result.add(property.get());
            }
            else end++;
        }
        return result;
    }

    // Utility method to check if a property matches the query criteria
    private boolean shouldIncludeProperty(Property property, List<String> queries) {
        // Implement your logic to match the property with the queries
        // Return true if the property should be included, false otherwise
        // You can use the 'queries' array to filter properties based on your criteria
        // Example: Check if property.getAgentName() is in the 'queries' array, etc.
        boolean sameAgent = queries.get(0) == null || property.getAgentName().equals(queries.get(0));
        boolean sameName = queries.get(1) == null || property.getName().toLowerCase().contains(queries.get(1).toLowerCase());
        //TODO add price
        boolean sameRooms = queries.get(3) == null || property.getNumberOfRooms() == Integer.parseInt(queries.get(3));
        boolean sameStreet = queries.get(4) == null || property.getAddress().getStreet().toLowerCase().contains(queries.get(4).toLowerCase());
        boolean sameCity = queries.get(5) == null || property.getAddress().getCity().toLowerCase().equals(queries.get(5).toLowerCase());
        boolean sameRegion = queries.get(6) == null || property.getAddress().getRegion().toLowerCase().equals(queries.get(6).toLowerCase());
        boolean sameCountry = queries.get(7) == null || property.getAddress().getCountry().toLowerCase().equals(queries.get(7).toLowerCase());
        boolean samePostal = queries.get(8) == null || property.getAddress().getPostalCode().toLowerCase().equals(queries.get(8).toLowerCase());
        boolean sameX = queries.get(9) == null || smallDifference(property.getAddress().getLongitude(), Double.parseDouble(queries.get(9)));
        boolean sameY = queries.get(10) == null || smallDifference(property.getAddress().getLatitude(), Double.parseDouble(queries.get(10)));
        return sameAgent && sameName && sameRooms && sameStreet && sameCity && sameRegion && sameCountry && samePostal && sameX && sameY;
    }

    private boolean smallDifference(double actual, double wanted) {
        double threshold = 5;
        return Math.abs(actual - wanted) < threshold;
    }


    @PostMapping("/properties/setPhotos/{id}")
    public ResponseEntity<Property> setPhotos(@PathVariable Long id, @RequestBody int[] photoIds) {
        try {
            Property property = propertyRepository.findById(id).get();
            for (int photoId : photoIds) {
                Photo photo = this.photoRepository.findById((long) photoId).get();
                property.addPhoto(photo);
            }
            property = propertyRepository.save(property);
            return new ResponseEntity<>(property, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}