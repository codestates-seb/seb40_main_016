package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.user.entity.User;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.cocoa.catdog.article.entity.QArticle.article;
import static com.cocoa.catdog.user.entity.QUser.user;

public class ArticleRepositoryCustomImpl extends QuerydslRepositorySupport implements ArticleRepositoryCustom {
    @Autowired
    private JPAQueryFactory queryFactory;

    public ArticleRepositoryCustomImpl() {
        super(Article.class);
    }

    @Override
    public Page<Article> findBySearch (Pageable pageable, String sort, String search) {
        JPQLQuery<Article> query =
                queryFactory
                        .selectFrom(article)
                        .join(article.user, user)
                        .where(eqType(sort), containUserName(search));

        List<Article> articles = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Article>(articles, pageable, query.fetchCount());

    }

    @Override
    public Page<Article> findBySearchAndFollowing (Pageable pageable, List<Long> followedUsers ,String search) {
        JPAQuery<Article> query =
                queryFactory
                        .selectFrom(article)
                        .join(article.user, user)
                        .where(user.userId.in(followedUsers), containUserName(search));

        List<Article> articles = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Article>(articles, pageable, query.fetchCount());

    }

    private BooleanExpression eqType(String sort) {
        if(sort == null || sort.isEmpty() || sort.equals("all")) {
            return null;
        } else if(sort.equals("dogs") || sort.equals("cats") || sort.equals("persons")) {
            return user.userType.eq(User.UserType.valueOf(sort.substring(0, sort.length() - 1).toUpperCase()));
        } else {
            throw new BusinessLogicException(ExceptionCode.BAD_QUERY);
        }
    }

    private BooleanExpression containUserName(String search) {
        if(search == null || search.isEmpty()) {
            return null;
        }
        return user.userName.contains(search);
    }
}