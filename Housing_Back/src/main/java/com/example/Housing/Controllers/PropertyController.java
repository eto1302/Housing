package com.example.Housing.Controllers;

import com.example.Housing.Entities.Address;
import com.example.Housing.Entities.Log;
import com.example.Housing.Entities.Photo;
import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.AddressRepository;
import com.example.Housing.Repositories.PhotoRepository;
import com.example.Housing.Repositories.PropertyRepository;
import com.example.Housing.Services.LogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://localhost:4202", "http://localhost:4203"})
public class PropertyController {

    public PropertyController(PropertyRepository propertyRepository, AddressRepository addressRepository, PhotoRepository photoRepository, LogService logService) {
        this.propertyRepository = propertyRepository;
        this.addressRepository = addressRepository;
        this.photoRepository = photoRepository;
        this.logService = logService;
    }

    private final PropertyRepository propertyRepository;
    private final AddressRepository addressRepository;
    private final PhotoRepository photoRepository;
    private final LogService logService;

    @GetMapping("/properties")
    public List<Property> getProperties() {
        return propertyRepository.findAllByOrderByIdDesc();
    }

    @PostMapping("/properties")
    public ResponseEntity<Property> addProperty(@RequestBody Property property) {
        try {
            Property savedProperty = propertyRepository.saveAndFlush(property);
            logService.saveLog(new Log("Property Added: " + savedProperty.getName() + " by " + savedProperty.getAgentName(), "DB_Change"));
            return new ResponseEntity<>(savedProperty, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error while adding property: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/properties/edit/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable long id, @RequestBody Property newProperty) {
        Property existingProperty = propertyRepository.findById(id).orElse(null);
        if (existingProperty != null) {
            // Remove the existing address association
            Address existingAddress = existingProperty.getAddress();
            if (existingAddress != null) {
                existingProperty.setAddress(null);
                addressRepository.delete(existingAddress); // Delete the old address
            }

            // Remove the existing photo associations
            Set<Photo> existingPhotos = existingProperty.getPhotos();
            if (existingPhotos != null && !existingPhotos.isEmpty()) {
                existingProperty.getPhotos().clear();
                photoRepository.deleteAll(existingPhotos); // Delete the old photos
            }

            // Update the existing property with the new property's values
            existingProperty.setAgentName(newProperty.getAgentName());
            existingProperty.setName(newProperty.getName());
            existingProperty.setDescription(newProperty.getDescription());
            existingProperty.setPrice(newProperty.getPrice());
            existingProperty.setDateOfAvailability(newProperty.getDateOfAvailability());
            existingProperty.setNumberOfRooms(newProperty.getNumberOfRooms());
            existingProperty.setVideoLink(newProperty.getVideoLink());
            existingProperty.setServiceCosts(newProperty.getServiceCosts());
            existingProperty.setSpecifics(newProperty.getSpecifics());
            existingProperty.setNumberOfBedrooms(newProperty.getNumberOfBedrooms());
            existingProperty.setNumberOfBathrooms(newProperty.getNumberOfBathrooms());
            existingProperty.setNumberOfFloors(newProperty.getNumberOfFloors());
            existingProperty.setFacilities(newProperty.getFacilities());
            existingProperty.setInterior(newProperty.getInterior());
            existingProperty.setLivingArea(newProperty.getLivingArea());
            existingProperty.setPlotArea(newProperty.getPlotArea());
            existingProperty.setVolume(newProperty.getVolume());
            existingProperty.setStatus(newProperty.getStatus());
            existingProperty.setTypeOfHouse(newProperty.getTypeOfHouse());
            existingProperty.setTypeOfConstruction(newProperty.getTypeOfConstruction());
            existingProperty.setYearOfConstruction(newProperty.getYearOfConstruction());
            existingProperty.setBalconyArea(newProperty.getBalconyArea());
            existingProperty.setGardenArea(newProperty.getGardenArea());
            existingProperty.setTypeOfParking(newProperty.getTypeOfParking());


            // If the new property has a new address, create and associate it
            Address newAddress = newProperty.getAddress();
            if (newAddress != null) {
                Address savedAddress = addressRepository.save(newAddress);
                existingProperty.setAddress(savedAddress);
            }

            // If the new property has new photos, create and associate them
            Set<Photo> newPhotos = newProperty.getPhotos();
            if (newPhotos != null && !newPhotos.isEmpty()) {
                Set<Photo> savedPhotos = new HashSet<>();
                for (Photo newPhoto : newPhotos) {
                    Photo savedPhoto = photoRepository.save(newPhoto);
                    savedPhotos.add(savedPhoto);
                }
                existingProperty.setPhotos(savedPhotos);
            }

            // Save the updated property, which will also remove the old associated entities
            Property updatedProperty = propertyRepository.save(existingProperty);

            logService.saveLog(new Log("Property Edited: " + updatedProperty.getName() + " by " + updatedProperty.getAgentName(), "DB_Change"));

            return new ResponseEntity<>(updatedProperty, HttpStatus.OK);
        } else {
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
        return getProperties().stream()
                .mapToInt(property -> (int) property.getId())
                .max()
                .orElse(0);
    }

    @GetMapping("/properties/{begin}/{end}")
    public List<Property> getPropertiesInRange(@PathVariable Long begin, @PathVariable Long end) {
        List<Property> result = new ArrayList<>();
        for (Long i = begin; i < end; ++i) {
            System.out.println(begin + " : " + i + " : " + end);
            if (i > this.getCount()) break;
            var property = propertyRepository.findById(i);

            // Check if the property matches the query criteria
            if (property.isPresent()) {
                result.add(property.get());
            } else end++;
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
        List<String> queries = (ArrayList<String>) requestBody.get("queries");
        if (queries == null || queries.stream().allMatch(Objects::isNull))
            return getPropertiesInRange(begin, end);
        System.out.println("Using queries: " + String.join(", ", queries));

        List<Property> result = new ArrayList<>();

        for (Long i = begin; i < end; ++i) {
            if (i > this.getCount()) break;
            var property = propertyRepository.findById(i);

            // Check if the property matches the query criteria
            if (property.isPresent() && shouldIncludeProperty(property.get(), queries)) {
                result.add(property.get());
            } else end++;
        }
        return result;
    }

    // Utility method to check if a property matches the query criteria
    private boolean shouldIncludeProperty(Property property, List<String> queries) {
        boolean sameAgent = queries.get(0) == null || property.getAgentName().equals(queries.get(0));
        boolean sameName = queries.get(1) == null || property.getName().toLowerCase().contains(queries.get(1).toLowerCase());
        boolean samePrice = (queries.get(2) == null || property.getPrice() >= Integer.parseInt(queries.get(2))) &&
                (queries.get(3) == null || property.getPrice() <= Integer.parseInt(queries.get(3)));
        boolean sameRooms = queries.get(4) == null || property.getNumberOfRooms() >= Integer.parseInt(queries.get(4));
        boolean sameBedrooms = queries.get(5) == null || property.getNumberOfBedrooms() == Integer.parseInt(queries.get(5));
        boolean sameCity = queries.get(6) == null || property.getAddress().getCity().toLowerCase().equals(queries.get(6).toLowerCase());
        boolean sameRegion = queries.get(7) == null || property.getAddress().getRegion().toLowerCase().equals(queries.get(7).toLowerCase());
        boolean sameCountry = queries.get(8) == null || property.getAddress().getCountry().toLowerCase().equals(queries.get(8).toLowerCase());
        boolean sameArea = (queries.get(9) == null || property.getLivingArea() >= Integer.parseInt(queries.get(9))) &&
                (queries.get(10) == null || property.getLivingArea() <= Integer.parseInt(queries.get(10)));
        boolean sameParking = queries.get(11) == null || (property.getTypeOfParking().isEmpty() == (queries.get(11).equals("yes")));
        boolean sameStatus = queries.get(12) == null || (Objects.equals(property.getStatus(), queries.get(12)));
        return sameAgent && sameName && samePrice && sameRooms && sameBedrooms && sameCity && sameRegion && sameCountry && sameParking && sameArea && sameStatus;
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

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<String> deleteProperty(@PathVariable Long id) {
        System.out.println("Deleting id: " + id);
        try {
            Property property = propertyRepository.findById(id).orElse(null);
            if (property != null) {
                // Delete the associated address
                Address propertyAddress = property.getAddress();
                if (propertyAddress != null) {
                    addressRepository.delete(propertyAddress);
                }

                // Delete the associated photos
                Set<Photo> propertyPhotos = property.getPhotos();
                if (propertyPhotos != null && !propertyPhotos.isEmpty()) {
                    photoRepository.deleteAll(propertyPhotos);
                }

                // Delete the property itself
                propertyRepository.delete(property);

                logService.saveLog(new Log("Property Deleted: " + property.getName() + " by " + property.getAgentName(), "DB_Change"));

                return new ResponseEntity<>("Property with ID " + id + " has been deleted.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Property with ID " + id + " not found.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while deleting the property.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}