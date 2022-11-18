package com.cocoa.catdog.fileIO;

import java.io.InputStream;

public interface FileService {

    void uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String fileName);

}
