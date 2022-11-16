package com.cocoa.catdog.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    USER_NOT_FOUND(404, "User not found"),

    USER_EXISTS(409, "User exists"),
    FOLLOW_EXISTS(409, "followed already"),

    USER_SLEEP(411,"휴면 상태"),
    USER_DROPPED(412,"탈퇴"),
    ARTICLE_NOT_FOUND(404, "Question not found"),

    USER_UNAUTHORIZED(403, "User unauthorized"),

    ANSWER_NOT_FOUND(404,"Answer not found"),

    COMMENT_NOT_FOUND(404, "Comment not found");
           



        private final int status;

    private final String message;

        ExceptionCode(int statusCode, String message) {
        this.status = statusCode;
        this.message = message;
        }
}
