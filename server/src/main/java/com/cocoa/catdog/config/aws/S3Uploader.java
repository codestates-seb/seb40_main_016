package com.cocoa.catdog.config.aws;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cocoa.catdog.config.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.EmptyStackException;
import java.util.Optional;
import java.util.UUID;



@Slf4j
@Component
@RequiredArgsConstructor
@Service
public class S3Uploader {


    @Value("${cloud.aws.s3.bucket}")
    public String bucket;
    private final AmazonS3 amazonS3;
    private final AmazonS3Client client;

    public String uploadFile(String category, MultipartFile multipartFile) {
        // 참고:https://velog.io/@penrose_15/
        validateFileExists(multipartFile);

        String fileName = CommonUtils.buildFileName(multipartFile.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setCacheControl(multipartFile.getContentType());


        // inputStream 과 ObjectMetadata 를 받는 메소드로, 로컬에는 저장하지 않는 방식
        try (InputStream inputStream = multipartFile.getInputStream()) {

            client.putObject(new PutObjectRequest(bucket, fileName, inputStream,
                    objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (Exception e) {
            log.error("Cannot upload image, ", e);
            throw new RuntimeException("Cannot upload image");
        }
        String url = client.getUrl(bucket, fileName).toString();

        return url;
    }



//    private void removeNewFile(File targetFile) {
//        if (targetFile.delete()) {
//            log.info("File delete success");
//            return;
//        }
//        log.info("File delete fail");
//    }


    private void validateFileExists(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            throw new RuntimeException();
        }
    }


//    public String update(MultipartFile multipartFile) throws IOException {
//        String s3FileName = UUID.randomUUID() + "-" +
//                multipartFile.getOriginalFilename();
//
//        ObjectMetadata objMeta = new ObjectMetadata();
//        objMeta.setContentLength(multipartFile.getInputStream().available());
//
//        amazonS3.putObject(bucket, s3FileName,
//                multipartFile.getInputStream(),
//                objMeta);
//
//        return amazonS3.getUrl(bucket, s3FileName).toString();
//    }


}



