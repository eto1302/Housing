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

    private double price;

    private Date dateOfAvailability;

    private int numberOfRooms;

    private String videoLink;

    //addCharacteristics
    private boolean includingUtilities;
    @OneToMany(
            cascade = CascadeType.REMOVE,
            orphanRemoval = true
    )
    private Set<Photo> photos;
    public Property() {
    }

    public Property(String agentName, String name, String description, Address address,
                    double price, Date dateOfAvailability, int numberOfRooms, String videoLink,
                    boolean includingUtilities, Set<Photo> photos) {
        this.agentName = agentName;
        this.name = name;
        this.description = description;
        this.address = address;
        this.price = price;
        this.dateOfAvailability = dateOfAvailability;
        this.numberOfRooms = numberOfRooms;
        this.videoLink = videoLink;
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
        return getId() == property.getId() && Double.compare(property.getPrice(), getPrice()) == 0 && getNumberOfRooms() == property.getNumberOfRooms() && isIncludingUtilities() == property.isIncludingUtilities() && Objects.equals(getAgentName(), property.getAgentName()) && Objects.equals(getName(), property.getName()) && Objects.equals(getDescription(), property.getDescription()) && Objects.equals(getAddress(), property.getAddress()) && Objects.equals(getDateOfAvailability(), property.getDateOfAvailability()) && Objects.equals(getVideoLink(), property.getVideoLink()) && Objects.equals(getPhotos(), property.getPhotos());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getAgentName(), getName(), getDescription(), getAddress(), getPrice(), getDateOfAvailability(), getNumberOfRooms(), getVideoLink(), isIncludingUtilities(), getPhotos());
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    @Override
    public String toString() {
        return "Property{" +
                "id=" + id +
                ", agentName='" + agentName + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", address=" + address +
                ", price=" + price +
                ", dateOfAvailability=" + dateOfAvailability +
                ", numberOfRooms=" + numberOfRooms +
                ", videoLink='" + videoLink + '\'' +
                ", includingUtilities=" + includingUtilities +
                ", photos=" + photos +
                '}';
    }
}