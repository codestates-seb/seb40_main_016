import React, { useEffect, useState, useRef } from "react";

import SnackGiver from "../SnackGiver/SnackGiver";

import { Wrapper, HiddenInput, Btn, Icon } from "./style";

import { ReactComponent as HeartIcon } from "../../../assets/img/heart-icon.svg";
import { ReactComponent as HeartActiveIcon } from "../../../assets/img/heart-color-icon.svg";
import { ReactComponent as FishIcon } from "../../../assets/img/fish-icon.svg";
import { ReactComponent as FishActiveIcon } from "../../../assets/img/fish-color-icon.svg";
import { ReactComponent as BoneIcon } from "../../../assets/img/bone-icon.svg";
import { ReactComponent as BoneActiveIcon } from "../../../assets/img/bone-color-icon.svg";
import { ReactComponent as SubscribeIcon } from "../../../assets/img/subscribe-simple-icon.svg";
import { ReactComponent as SubscribeActiveIcon } from "../../../assets/img/subscribe-simple-color-icon.svg";

interface Prop {
  btnId: string;
  className?: string;
  btnType: "like" | "snack" | "subscribe";
  userType?: "PERSON" | "CAT" | "DOG";
  defaultStatus: boolean;
  onActive?: (arg?: any) => void;
  onInactive?: (arg?: any) => void;
  disabled?: boolean;
  articleId?: number;
  updateSnack?: (arg: number) => void;
}

const ReactionBtn = ({
  btnId,
  className = "",
  btnType,
  userType,
  defaultStatus,
  onActive = () => {},
  onInactive = () => {},
  disabled = false,
  articleId,
  updateSnack,
}: Prop) => {
  const [checked, setChecked] = useState<boolean>(defaultStatus);
  const [isSnackGiver, setIsSnackGiver] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (e.target.checked) {
      if (btnType === "snack") {
        setIsSnackGiver(true);
      }
      onActive();
    } else {
      if (btnType === "snack") {
        setIsSnackGiver(false);
      }
      onInactive();
    }
  };

  const onDisabledClick = (e: React.MouseEvent) => {
    if (inputRef.current.disabled) {
      alert("로그인이 필요합니다.😆");
    }
  };

  useEffect(() => {
    setChecked(defaultStatus);
  }, [defaultStatus]);

  useEffect(() => {
    if (btnType === "snack") {
      window.addEventListener("click", (e: { target: any }) => {
        const target = e.target;
        if (!target.closest(`#${btnId}-wrapper`)) {
          setChecked(false);
          setIsSnackGiver(false);
        }
      });
    }
  }, []);

  return (
    <>
      <Wrapper className={className} id={`${btnId}-wrapper`}>
        <HiddenInput
          ref={inputRef}
          id={btnId}
          type="checkbox"
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
        <Btn htmlFor={btnId} onClick={onDisabledClick}>
          <Icon>
            {(() => {
              switch (btnType) {
                case "like":
                  return <HeartIcon />;
                case "snack":
                  switch (userType) {
                    case "PERSON":
                      return <></>;
                    case "CAT":
                      return <FishIcon />;
                    case "DOG":
                      return <BoneIcon />;
                    default:
                      return <></>;
                  }
                case "subscribe":
                  return <SubscribeIcon className="sub" />;
                default:
                  <></>;
              }
            })()}
          </Icon>
          <Icon>
            {(() => {
              switch (btnType) {
                case "like":
                  return <HeartActiveIcon />;
                case "snack":
                  switch (userType) {
                    case "PERSON":
                      return <></>;
                    case "CAT":
                      return <FishActiveIcon />;
                    case "DOG":
                      return <BoneActiveIcon />;
                    default:
                      return <></>;
                  }
                case "subscribe":
                  return <SubscribeActiveIcon className="sub" />;
                default:
                  <></>;
              }
            })()}
          </Icon>
        </Btn>
        {btnType === "snack" ? (
          <SnackGiver
            className={isSnackGiver ? "active" : ""}
            articleId={articleId}
            setIsSnackGiver={setIsSnackGiver}
            updateSnack={updateSnack}
            setChecked={setChecked}
          />
        ) : (
          <></>
        )}
      </Wrapper>
    </>
  );
};

export default ReactionBtn;
