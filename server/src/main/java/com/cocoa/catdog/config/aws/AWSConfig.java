package com.cocoa.catdog.config.aws;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.BasicAWSCredentials;

@Configuration
public class AWSConfig {

    @Value("${cloud.aws.s3.access-key}")
    private String accessKey;
    @Value("${cloud.aws.s3.secret-key}")
    private String secretKey;

    @Bean
    public BasicAWSCredentials AwsCredentials() {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
        return awsCreds;
    }


    }


}

