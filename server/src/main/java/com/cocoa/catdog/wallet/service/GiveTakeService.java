package com.cocoa.catdog.wallet.service;

import com.cocoa.catdog.article.entity.Article;
import com.cocoa.catdog.article.service.ArticleService;
import com.cocoa.catdog.exception.BusinessLogicException;
import com.cocoa.catdog.exception.ExceptionCode;
import com.cocoa.catdog.message.event.EventService;
import com.cocoa.catdog.user.entity.User;
import com.cocoa.catdog.user.service.UserService;
import com.cocoa.catdog.wallet.entity.GiveTake;
import com.cocoa.catdog.wallet.entity.Wallet;
import com.cocoa.catdog.wallet.repository.GiveTakeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GiveTakeService {

    private final ArticleService articleService;
    private final UserService userService;
    private final GiveTakeRepository giveTakeRepository;
    private final EventService eventService;

    public GiveTake createGiveTake(GiveTake giveTake, Long articleId, Long userId) {
        //엔티티 조회
        Article article = articleService.findArticle(articleId);
        User takeUser = article.getUser();
        Wallet takeWlt = takeUser.getWallet();
        User giveUser = userService.findUser(userId);
        Wallet giveWlt = giveUser.getWallet();
        int giveYummy = giveTake.getGiveYummy();

        //자기 자신에게 보내는 경우 에러처리
        if(giveWlt.getWalletId().equals(takeWlt.getWalletId())) {
            throw new BusinessLogicException(ExceptionCode.CANT_GIVE_ONESELF);
        }

        //yummy 계산
        giveWlt.minusYummy(giveYummy); // 기부자는 yummy차감
        if(giveWlt.getYummy() < 0) {
            throw new BusinessLogicException(ExceptionCode.INSUFFICIENT_YUMMY); // yummy차감 후 yummy가 음수면 에러처리
        }
        takeWlt.plusYummy(giveYummy); // 받는자는 yummy 증가

        //매핑
        giveTake.addGiveWlt(giveWlt);
        giveTake.addTakeWlt(takeWlt);
        giveTake.addArticle(article);

        //게시물의 yummuCnt 최신화
        Article updatedArticle = giveTake.getArticle();
        updatedArticle.changeYummyCnt(updatedArticle.getGiveTakes().stream().mapToInt(GiveTake::getGiveYummy).sum());

        GiveTake save = giveTakeRepository.save(giveTake);
        eventService.sendGetYummyMessage(giveUser, takeUser, giveYummy);
        return save;
    }

}
