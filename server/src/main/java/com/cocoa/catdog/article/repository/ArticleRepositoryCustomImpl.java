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
import static com.cocoa.catdog.user.entity.QFollow.follow;
import static com.cocoa.catdog.wallet.entity.QGiveTake.giveTake;

public class ArticleRepositoryCustomImpl extends QuerydslRepositorySupport implements ArticleRepositoryCustom {
    @Autowired
    private JPAQueryFactory queryFactory;

    public ArticleRepositoryCustomImpl() {
        super(Article.class);
    }

    @Override
    public Page<Article> findBySearch (Pageable pageable, String sort, String search, Long userId) {
        JPQLQuery<Article> query =
                queryFactory
                        .select(article)
                        .from(article, follow)
                        .join(article.user, user)
                        .where(eqSort(sort, userId), containUserName(search));

        List<Article> articles = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Article>(articles, pageable, query.fetchCount());

    }

    @Override
    public Page<Article> findByProfile (Pageable pageable, String tab, Long userId) {
        JPAQuery<Article> query =
                queryFactory
                        .select(article)
                        .from(giveTake)
                        .rightJoin(giveTake.article, article)
                        .join(article.user, user)
                        .where(eqTab(tab, userId));

        List<Article> articles = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Article>(articles, pageable, query.fetchCount());

    }

    private BooleanExpression eqSort(String sort, Long userId) {
        if(sort == null || sort.isEmpty() || sort.equals("all")) {
            return null;
        } else if(sort.equals("dogs") || sort.equals("cats") || sort.equals("persons")) {
            return user.userType.eq(User.UserType.valueOf(sort.substring(0, sort.length() - 1).toUpperCase()));
        } else if(sort.equals("followings")) {
            return user.userId.eq(follow.followedUser.userId)
                    .and(follow.followingUser.userId.eq(userId));

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

    private BooleanExpression eqTab(String tab, Long userId) {
        if(tab == null || tab.isEmpty()) {
            return null;
        } else if(tab.equals("post")) {
            return user.userId.eq(userId);
        } else if(tab.equals("give")) {
            return giveTake.giveWlt.user.userId.eq(userId)
                    .and(article.articleId.eq(giveTake.article.articleId));
        } else if(tab.equals("take")) {
            return null;
        } else {
            throw new BusinessLogicException(ExceptionCode.BAD_QUERY);
        }
    }

}
