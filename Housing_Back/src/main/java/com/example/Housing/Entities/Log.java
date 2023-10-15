package com.example.Housing.Entities;

import jakarta.persistence.*;

import javax.print.attribute.standard.DateTimeAtCompleted;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name="logs")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String text;
    private Date date;

    public Log(String text) {
        this.text = text;
        this.date = new Date();
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
        if (!(o instanceof Log log)) return false;
        return id == log.id && Objects.equals(text, log.text) && Objects.equals(date, log.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, date);
    }

    @Override
    public String toString() {
        return date.toString() + ": " + text;
    }
}
