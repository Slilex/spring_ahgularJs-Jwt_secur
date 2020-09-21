package com.examplesec.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_detailes")
public class UserDetailes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "app_id")
    private String appId;
}
