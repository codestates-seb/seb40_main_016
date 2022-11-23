package com.cocoa.catdog;

import com.cocoa.catdog.config.aws.S3Uploader;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
@Log4j2
public class S3UploaderTest {

    @Autowired
    private S3Uploader s3Uploader;

    @Test
    public void testUpload() {

        try {
            String filePath = "/home/appstew/Downloads/1.jpg";

            String uploadName = s3Uploader.uploadLocal(filePath);

//            log.info("efef");

        } catch (Exception e) {
//            log.error(e.getMessage());
        }
    }

}
