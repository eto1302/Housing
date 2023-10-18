package com.example.Housing.Entities;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String agentName;

    private String name;

    @Column(name = "description", length = 8192)
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressId", referencedColumnName = "id")
    private Address address;
    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Photo> photos;

    private double price;
    private double serviceCosts;
    @Column(name = "specifics", length = 8192)
    private String specifics;
    private String videoLink;
    private Date dateOfAvailability;
    private Date dateOfOffer;
    private int numberOfRooms;
    private int numberOfBedrooms;
    private int numberOfBathrooms;
    private int numberOfFloors;
    @Column(name = "facilities", length = 8192)
    private String facilities;
    private String interior;
    private double livingArea;
    private double plotArea;
    private double volume;
    private String status;
    private String typeOfHouse;
    private String typeOfConstruction;
    private int yearOfConstruction;
    private double balconyArea;
    private double gardenArea;
    private String typeOfParking;
    public Property() {
    }

    public Property(String agentName, String name, String description, Address address,
                    Set<Photo> photos, double price, double serviceCosts, String specifics,
                    String videoLink, Date dateOfAvailability, Date dateOfOffer, int numberOfRooms,
                    int numberOfBedrooms, int numberOfBathrooms, int numberOfFloors,
                    String facilities, String interior,
                    double livingArea, double plotArea, double volume, String status,
                    String typeOfHouse, String typeOfConstruction, int yearOfConstruction,
                    double balconyArea, double gardenArea, String typeOfParking) {
        this.agentName = agentName;
        this.name = name;
        this.description = description;
        this.address = address;
        this.photos = photos;
        this.price = price;
        this.serviceCosts = serviceCosts;
        this.specifics = specifics;
        this.videoLink = videoLink;
        this.dateOfAvailability = dateOfAvailability;
        this.dateOfOffer = dateOfOffer;
        this.numberOfRooms = numberOfRooms;
        this.numberOfBedrooms = numberOfBedrooms;
        this.numberOfBathrooms = numberOfBathrooms;
        this.numberOfFloors = numberOfFloors;
        this.facilities = facilities;
        this.interior = interior;
        this.livingArea = livingArea;
        this.plotArea = plotArea;
        this.volume = volume;
        this.status = status;
        this.typeOfHouse = typeOfHouse;
        this.typeOfConstruction = typeOfConstruction;
        this.yearOfConstruction = yearOfConstruction;
        this.balconyArea = balconyArea;
        this.gardenArea = gardenArea;
        this.typeOfParking = typeOfParking;
    }

    public long getId() {
        return id;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
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

    public Set<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getServiceCosts() {
        return serviceCosts;
    }

    public void setServiceCosts(double serviceCosts) {
        this.serviceCosts = serviceCosts;
    }

    public String getSpecifics() {
        return specifics;
    }

    public void setSpecifics(String specifics) {
        this.specifics = specifics;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public Date getDateOfAvailability() {
        return dateOfAvailability;
    }

    public void setDateOfAvailability(Date dateOfAvailability) {
        this.dateOfAvailability = dateOfAvailability;
    }

    public Date getDateOfOffer() {
        return dateOfOffer;
    }

    public void setDateOfOffer(Date dateOfOffer) {
        this.dateOfOffer = dateOfOffer;
    }

    public int getNumberOfRooms() {
        return numberOfRooms;
    }

    public void setNumberOfRooms(int numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }

    public int getNumberOfBedrooms() {
        return numberOfBedrooms;
    }

    public void setNumberOfBedrooms(int numberOfBedrooms) {
        this.numberOfBedrooms = numberOfBedrooms;
    }

    public int getNumberOfBathrooms() {
        return numberOfBathrooms;
    }

    public void setNumberOfBathrooms(int numberOfBathrooms) {
        this.numberOfBathrooms = numberOfBathrooms;
    }

    public int getNumberOfFloors() {
        return numberOfFloors;
    }

    public void setNumberOfFloors(int numberOfFloors) {
        this.numberOfFloors = numberOfFloors;
    }

    public String getFacilities() {
        return facilities;
    }

    public void setFacilities(String facilities) {
        this.facilities = facilities;
    }

    public String getInterior() {
        return interior;
    }

    public void setInterior(String interior) {
        this.interior = interior;
    }

    public double getLivingArea() {
        return livingArea;
    }

    public void setLivingArea(double livingArea) {
        this.livingArea = livingArea;
    }

    public double getPlotArea() {
        return plotArea;
    }

    public void setPlotArea(double plotArea) {
        this.plotArea = plotArea;
    }

    public double getVolume() {
        return volume;
    }

    public void setVolume(double volume) {
        this.volume = volume;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTypeOfHouse() {
        return typeOfHouse;
    }

    public void setTypeOfHouse(String typeOfHouse) {
        this.typeOfHouse = typeOfHouse;
    }

    public String getTypeOfConstruction() {
        return typeOfConstruction;
    }

    public void setTypeOfConstruction(String typeOfConstruction) {
        this.typeOfConstruction = typeOfConstruction;
    }

    public int getYearOfConstruction() {
        return yearOfConstruction;
    }

    public void setYearOfConstruction(int yearOfConstruction) {
        this.yearOfConstruction = yearOfConstruction;
    }

    public double getBalconyArea() {
        return balconyArea;
    }

    public void setBalconyArea(double balconyArea) {
        this.balconyArea = balconyArea;
    }

    public double getGardenArea() {
        return gardenArea;
    }

    public void setGardenArea(double gardenArea) {
        this.gardenArea = gardenArea;
    }

    public String getTypeOfParking() {
        return typeOfParking;
    }

    public void setTypeOfParking(String typeOfParking) {
        this.typeOfParking = typeOfParking;
    }

    public void addPhoto(Photo photo){
        this.photos.add(photo);
    }

    public void removePhoto(Photo photo){
        this.photos.remove(photo);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Property property)) return false;
        return id == property.id && Double.compare(property.price, price) == 0 &&
                Double.compare(property.serviceCosts, serviceCosts) == 0 &&
                numberOfRooms == property.numberOfRooms &&
                numberOfBedrooms == property.numberOfBedrooms &&
                numberOfBathrooms == property.numberOfBathrooms &&
                numberOfFloors == property.numberOfFloors &&
                Double.compare(property.livingArea, livingArea) == 0 &&
                Double.compare(property.plotArea, plotArea) == 0 &&
                Double.compare(property.volume, volume) == 0 &&
                yearOfConstruction == property.yearOfConstruction &&
                Double.compare(property.balconyArea, balconyArea) == 0 &&
                Double.compare(property.gardenArea, gardenArea) == 0 &&
                Objects.equals(agentName, property.agentName) &&
                Objects.equals(name, property.name) &&
                Objects.equals(description, property.description) &&
                Objects.equals(address, property.address) &&
                Objects.equals(photos, property.photos) &&
                Objects.equals(specifics, property.specifics) &&
                Objects.equals(videoLink, property.videoLink) &&
                Objects.equals(dateOfAvailability, property.dateOfAvailability) &&
                Objects.equals(dateOfOffer, property.dateOfOffer) &&
                Objects.equals(facilities, property.facilities) &&
                Objects.equals(interior, property.interior) &&
                Objects.equals(status, property.status) &&
                Objects.equals(typeOfHouse, property.typeOfHouse) &&
                Objects.equals(typeOfConstruction, property.typeOfConstruction) &&
                Objects.equals(typeOfParking, property.typeOfParking);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, agentName, name, description, address, photos, price, serviceCosts,
                specifics, videoLink, dateOfAvailability, dateOfOffer, numberOfRooms,
                numberOfBedrooms, numberOfBathrooms, numberOfFloors, facilities,
                interior, livingArea, plotArea, volume, status, typeOfHouse, typeOfConstruction,
                yearOfConstruction, balconyArea, gardenArea, typeOfParking);
    }

    @Override
    public String toString() {
        return "Property{" +
                "id=" + id +
                ", agentName='" + agentName + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", address=" + address +
                ", photos=" + photos.stream().map(Photo::getId).toList() +
                ", price=" + price +
                ", serviceCosts=" + serviceCosts +
                ", specifics='" + specifics + '\'' +
                ", videoLink='" + videoLink + '\'' +
                ", dateOfAvailability=" + dateOfAvailability +
                ", dateOfOffer=" + dateOfOffer +
                ", numberOfRooms=" + numberOfRooms +
                ", numberOfBedrooms=" + numberOfBedrooms +
                ", numberOfBathrooms=" + numberOfBathrooms +
                ", numberOfFloors=" + numberOfFloors +
                ", facilities='" + facilities + '\'' +
                ", interior='" + interior + '\'' +
                ", livingArea=" + livingArea +
                ", plotArea=" + plotArea +
                ", volume=" + volume +
                ", status='" + status + '\'' +
                ", typeOfHouse='" + typeOfHouse + '\'' +
                ", typeOfConstruction='" + typeOfConstruction + '\'' +
                ", yearOfConstruction=" + yearOfConstruction +
                ", balconyArea=" + balconyArea +
                ", gardenArea=" + gardenArea +
                ", typeOfParking='" + typeOfParking + '\'' +
                '}';
    }
}