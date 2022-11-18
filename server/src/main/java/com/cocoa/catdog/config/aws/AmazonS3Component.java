package com.cocoa.catdog.config.aws;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class AmazonS3Component {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    @Value("${cloud.aws.s3.folder.folderName}")
    private String folderName;


}
