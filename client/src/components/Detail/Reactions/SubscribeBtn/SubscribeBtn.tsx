import { useEffect, useState } from "react";
import { DeleteSubscribe, GetIsSubscribe, PostSubscribe } from "../../../../api/subscribe";

import { useRecoilValue } from "recoil";
import accessTokenState from "../../../../_state/accessTokenState";
import isLoginState from "../../../../_state/isLoginState";

import { Button } from "./style";
import { ReactComponent as SubscribeIcon } from "../../../../assets/img/subscribe-simple-icon.svg";
import { ReactComponent as SubscribeActiveIcon } from "../../../../assets/img/subscribe-simple-color-icon.svg";

interface Prop {
  userId: number;
  authorId: number;
}

const SubscribeBtn = ({ userId, authorId }: Prop) => {
  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
  const token = useRecoilValue(accessTokenState);
  const isLogin = useRecoilValue(isLoginState);

  const checkAlreadySubscribe = () => {
    GetIsSubscribe(userId, authorId)
      .then((res) => {
        if (res.data === "ok") {
          setIsSubscribe(true);
        } else {
          setIsSubscribe(false);
        }
      })
      .catch((e) => alert("구독 여부 확인에 실패했습니다.😿"));
  };

  const handleSubscribe = () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
    } else {
      PostSubscribe(userId, authorId, token)
        .then((res) => {
          setIsSubscribe(true);
          return res;
        })
        .catch((err) => alert("구독에 실패했습니다.😿"));
    }
  };

  const handleSubscribeCancel = () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
    } else {
      DeleteSubscribe(userId, authorId, token)
        .then((res) => {
          setIsSubscribe(false);
          return res;
        })
        .catch((err) => alert("구독에 실패했습니다.😿"));
    }
  };

  useEffect(() => {
    if (userId && authorId) {
      checkAlreadySubscribe();
    }
  }, [userId, authorId]);

  return (
    <>
      {!isSubscribe ? (
        <Button onClick={handleSubscribe} active={false}>
          <SubscribeIcon />
        </Button>
      ) : (
        <Button onClick={handleSubscribeCancel} active={true}>
          <SubscribeActiveIcon />
        </Button>
      )}
    </>
  );
};

export default SubscribeBtn;
