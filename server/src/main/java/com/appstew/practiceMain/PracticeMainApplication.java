package com.appstew.practiceMain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableJpaAuditing
public class PracticeMainApplication {

	public static void main(String[] args) {
		SpringApplication.run(PracticeMainApplication.class, args);
	}

}
