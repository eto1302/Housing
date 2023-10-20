package com.example.Housing.Entities;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;
import java.util.TimeZone;

@Entity
@Table(name="logs")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "text", length = 16000)
    private String text;
    private String type;
    private Date date;

    public Log(String text, String type) {
        this.text = text;
        this.type = type;
        this.date = new Date(System.currentTimeMillis() + TimeZone.getTimeZone("Europe/Sofia").getRawOffset());
    }

    public Log() {
    }

    public long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Log)) return false;
        Log log = (Log) o;
        return id == log.id && Objects.equals(text, log.text) && Objects.equals(type, log.type) && Objects.equals(date, log.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, type, date);
    }

    @Override
    public String toString() {
        return "Log{" +
                "text='" + text + '\'' +
                ", type='" + type + '\'' +
                ", date=" + date +
                '}';
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
