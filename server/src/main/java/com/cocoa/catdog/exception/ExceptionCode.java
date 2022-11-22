package com.cocoa.catdog.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    USER_NOT_FOUND(404, "User not found"),

    USER_EXISTS(409, "User exists"),
    
    FOLLOW_EXISTS(409, "Already followed"),

    USER_SLEEP(411,"휴면 상태"),
    
    USER_DROPPED(412,"탈퇴"),
    
    ARTICLE_NOT_FOUND(404, "Question not found"),

    USER_UNAUTHORIZED(403, "User unauthorized"),

    ANSWER_NOT_FOUND(404,"Answer not found"),

    FOLLOW_NOT_FOUND(404, "Follow not found"),

    BAD_QUERY(404, "Bad query"),

    NOT_EXIST_ARTICLE_LIKE(404, "Not exist article like"),

    EXIST_ARTICLE_LIKE(404, "Exist article like"),

    EXIST_ARTICLE_REPORT(404, "Exist article report"),

    NOT_EXIST_COMMENT_LIKE(404, "Not exist comment like"),

    EXIST_COMMENT_LIKE(404, "Exist comment like"),

    EXIST_COMMENT_REPORT(404, "Exist comment report"),
    
    OUT_OF_STOCK(404, "Out_of_stock"),
    
    INSUFFICIENT_YUMMY(404, "Insufficient yummy"),
    
    ITEM_NOT_FOUND(404, "Item not found"),
    
    COMMENT_NOT_FOUND(404, "Comment not found");
           



        private final int status;

    private final String message;

        ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
        }
}
