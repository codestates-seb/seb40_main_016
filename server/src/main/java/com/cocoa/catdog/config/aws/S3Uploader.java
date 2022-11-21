package com.cocoa.catdog.config.aws;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;



@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {


    @Value("${cloud.aws.s3.bucket}")
    public String bucket;
    private final AmazonS3 amazonS3;
    private final AmazonS3Client client;

    public String upload(MultipartFile multipartFile, String dirName) throws  IOException {
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException());

        return upload(uploadFile, dirName);
    }

    private String upload(File file, String dirName) {
        String fileName = dirName + "/" + UUID.randomUUID() + file.getName();
        String uploadImageUrl = putS3(file, fileName);
        removeNewFile(file);
        return uploadImageUrl;

    }

    private String putS3(File file, String fileName) {
        client.putObject(new PutObjectRequest(bucket, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return client.getUrl(bucket, fileName).toString();

    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }

    private Optional<File> convert(MultipartFile multipartFile) throws IOException {
        File convertFile = new File(
                System.getProperty("user.dir") + "/" + multipartFile.getOriginalFilename());

        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
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



