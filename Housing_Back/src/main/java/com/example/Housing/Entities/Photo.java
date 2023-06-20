package com.example.Housing.Entities;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name="photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Lob
    @Column(name = "photo", columnDefinition="BLOB")
    private byte[] photo;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    public Photo() {
    }

    public Photo(byte[] photo) {
        this.photo = photo;
        this.property = property;
    }

    public long getId() {
        return id;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Photo photo1)) return false;
        return id == photo1.id && Arrays.equals(photo, photo1.photo) && Objects.equals(property, photo1.property);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, property);
        result = 31 * result + Arrays.hashCode(photo);
        return result;
    }


}
