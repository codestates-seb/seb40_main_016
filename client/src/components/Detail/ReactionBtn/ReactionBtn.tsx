import React, { useEffect, useState, useRef } from "react";

import SnackGiver from "../SnackGiver/SnackGive";

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
  onActive?: () => void;
  onInactive?: () => void;
}

const ReactionBtn = ({
  btnId,
  className = "",
  btnType,
  userType,
  defaultStatus,
  onActive = () => {},
  onInactive = () => {},
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

  useEffect(() => {
    setChecked(defaultStatus);
  }, [defaultStatus]);

  return (
    <>
      <Wrapper className={className}>
        <HiddenInput ref={inputRef} id={btnId} type="checkbox" onChange={onChange} checked={checked} />
        <Btn htmlFor={btnId}>
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
        {btnType === "snack" ? <SnackGiver className={isSnackGiver ? "active" : ""} /> : <></>}
      </Wrapper>
    </>
  );
};

export default ReactionBtn;
