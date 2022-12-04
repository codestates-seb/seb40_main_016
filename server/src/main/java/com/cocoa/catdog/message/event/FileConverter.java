package com.cocoa.catdog.message.event;





import org.apache.commons.fileupload.FileItem;


import org.apache.commons.fileupload.disk.DiskFileItem;


import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

public class FileConverter {

    static File multipartFileToFile(MultipartFile file) {
        File convFile = null;
        boolean result = true;
        try {
            // 혹시나 파일 이름이 중복될 수 있으니 파일 이름 앞에 랜덤한 숫자값을 덧붙여줌
            convFile = new File(file.getOriginalFilename());
            convFile.createNewFile();
            FileOutputStream fos = new FileOutputStream(convFile);
            fos.write(file.getBytes());
            fos.close();
            return convFile;

        } catch (Exception e){
            result = false;
            e.printStackTrace();

        } finally {
            if(result=false && convFile.exists()){
                convFile.delete();
            }
        }
        return null;
    }

    public static MultipartFile fileToMultipartFile(File file) throws IOException {
//        File file = new File("/path/to/file");
        FileItem fileItem = new DiskFileItem("mainFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

        try {
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
            // Or faster..
            // IOUtils.copy(new FileInputStream(file), fileItem.getOutputStream());
        } catch (IOException ex) {
            // do something.
        }

        return new CommonsMultipartFile(fileItem);
    }

    public static List<MultipartFile> filesToMultipartFiles(List<File> files) throws IOException {
        return files.stream().map(file -> {
            try {
                return fileToMultipartFile(file);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }
}
