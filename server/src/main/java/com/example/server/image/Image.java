package com.example.server.image;



import javax.persistence.*;

@Embeddable
public class Image {
    private String name;
    private String originalName;
    private String path;
}