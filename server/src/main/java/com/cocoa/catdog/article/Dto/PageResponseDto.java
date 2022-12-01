//package com.cocoa.catdog.article.Dto;
//
//import lombok.Getter;
//import org.springframework.data.domain.Page;
//
//import java.util.List;
//
//@Getter
//public class PageResponseDto<T> {
//    private final List<T> data;
//    private final PageInfo pageInfo;
//
//    private <P> PageResponseDto(List<T> data, Page<P> page) {
//        this.data = data;
//        this.pageInfo = pageInfo.of(page);
//    }
//
//    public static <T, P> PageResponseDto<T> of(List<T> data, Page<P> page) {
//        return new PageResponseDto<>(data, page)
//    }
//}