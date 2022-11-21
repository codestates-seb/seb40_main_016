package com.cocoa.catdog.config.aws;


import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class FileUploadController {

    private final S3Upoad s3Upoad;

    @PostMapping("/upload")
    public ApiResponse<String> uploadsFile(@RequestParam("images")
                                           MultipartFile multipartFile) throws IOException {
        return ApiResposne.success(HttpStatus.CREATED,
                s3uploads.upload(multipartFile.getInputStream(),
                        MultipartFile.getOrginalFilename(), fileSize));




    }

}
