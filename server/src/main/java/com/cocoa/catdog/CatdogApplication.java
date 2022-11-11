package com.cocoa.catdog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CatdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatdogApplication.class, args);
	}

}
