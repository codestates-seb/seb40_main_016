package com.cocoa.catdog.article.repository;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.user.entity.User;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
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
        JPQLQuery<Article> query = queryFactory.selectFrom(article)
                .join(article.user, user)
                .where(eqType(sort), containName(search));

        List<Article> articles = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Article>(articles, pageable, query.fetchCount());

    }

    private BooleanExpression eqType(String sort) {
        if(sort == null || sort.isEmpty()) {
            return null;
        }
        return user.userType.eq(User.UserType.valueOf(sort));
    }

    private BooleanExpression containName(String search) {
        if(search == null || search.isEmpty()) {
            return null;
        }
        return user.userName.contains(search);
    }
}
