package com.example.Housing.Entities;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String description;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "addressId", referencedColumnName = "id")
    private Address address;

    private double price;

    private Date dateOfAvailability;

    private int numberOfRooms;

    //addCharacteristics
    private boolean includingUtilities;
    @OneToMany(
            cascade = CascadeType.MERGE,
            orphanRemoval = true
    )
    private Set<Photo> photos;

    public Property(){
    }

    public Property(String name, String description, Address address, double price, Date dateOfAvailability, int numberOfRooms, boolean includingUtilities, Set<Photo> photos) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.price = price;
        this.dateOfAvailability = dateOfAvailability;
        this.numberOfRooms = numberOfRooms;
        this.includingUtilities = includingUtilities;
        this.photos = photos;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getDateOfAvailability() {
        return dateOfAvailability;
    }

    public void setDateOfAvailability(Date dateOfAvailability) {
        this.dateOfAvailability = dateOfAvailability;
    }

    public int getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public boolean isIncludingUtilities() {
        return includingUtilities;
    }

    public void setIncludingUtilities(boolean includingUtilities) {
        this.includingUtilities = includingUtilities;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Property property)) return false;
        return id == property.id && Double.compare(property.price, price) == 0 && numberOfRooms == property.numberOfRooms && includingUtilities == property.includingUtilities && Objects.equals(name, property.name) && Objects.equals(description, property.description) && Objects.equals(address, property.address) && Objects.equals(dateOfAvailability, property.dateOfAvailability) && Objects.equals(photos, property.photos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, address, price, dateOfAvailability, numberOfRooms, includingUtilities, photos);
    }

    @Override
    public String toString() {
        return "Property{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", address=" + address +
                ", price=" + price +
                ", dateOfAvailability=" + dateOfAvailability +
                ", numberOfRooms=" + numberOfRooms +
                ", includingUtilities=" + includingUtilities +
                ", photos=" + photos +
                '}';
    }
}