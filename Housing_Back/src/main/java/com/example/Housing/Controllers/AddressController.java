package com.example.Housing.Controllers;

import com.example.Housing.Entities.Address;
import com.example.Housing.Repositories.AddressRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AddressController {

    public AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    private final AddressRepository addressRepository;

    @GetMapping("/addresses")
    public List<Address> getAddresses() {
        return addressRepository.findAll();
    }

    @PostMapping("/addresses")
    void addAddress(@RequestBody Address property) {
        addressRepository.save(property);
    }
}