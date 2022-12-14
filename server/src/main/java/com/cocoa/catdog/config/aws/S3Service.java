package com.cocoa.catdog.config.aws;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.cocoa.catdog.article.Dto.ArticleImgDto;
import com.cocoa.catdog.article.entity.ArticleImg;
import com.cocoa.catdog.config.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.util.UUID;


@Slf4j
@Component
@RequiredArgsConstructor
@Service
public class S3Service {


    @Value("${cloud.aws.s3.bucket}")
    public String bucket;
    private final AmazonS3 amazonS3;
    private final AmazonS3Client client;
    private final AmazonS3Component component;


    public String uploadFile(String dirName, MultipartFile multipartFile) {
        // 참고:https://velog.io/@penrose_15/
        validateFileExists(multipartFile);

        String name = CommonUtils.buildFileName(multipartFile.getOriginalFilename());

        String fileName = dirName + name;
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

    ArticleImgDto.Post articleImgDto = ArticleImgDto.Post.builder()
            .imgUrl("Efe")
            .build();

    ArticleImg articleImg = new ArticleImg(
            articleImgDto.getImgUrl()
    );

    public String getFileUrl(String fileName) {
        return amazonS3.getUrl(component.getBucket(), fileName).toString();
    }

    public String uploadLocal(String filePath) throws RuntimeException {
        File targetFile = new File(filePath);

        String uploadImageUrl = putS3(targetFile, targetFile.getName());

        removeOriginalFile(targetFile);

        return uploadImageUrl;

    }

    private String putS3(File uploadFile, String fileName) throws RuntimeException {
        client.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        return client.getUrl(bucket, fileName).toString();

    }

    private void removeOriginalFile(File targetFile) {
        if (targetFile.exists() && targetFile.delete()) {
            log.info("File delete Success");
            return;
        }
        log.info("fail to remove");
    }

    public void removeS3File(String fileName) {
        final DeleteObjectRequest deleteObjectRequest =
                new DeleteObjectRequest(bucket, fileName);
        client.deleteObject(deleteObjectRequest);
//        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }



    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }


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



