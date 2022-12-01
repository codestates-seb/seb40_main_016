import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SnackGiver from "../SnackGiver/SnackGiver";

import { Wrapper, Button } from "./style";
import { ReactComponent as FishIcon } from "../../../../assets/img/fish-icon.svg";
import { ReactComponent as FishActiveIcon } from "../../../../assets/img/fish-color-icon.svg";
import { ReactComponent as BoneIcon } from "../../../../assets/img/bone-icon.svg";
import { ReactComponent as BoneActiveIcon } from "../../../../assets/img/bone-color-icon.svg";

interface Prop {
  articleId: number;
  authorType: "PERSON" | "CAT" | "DOG";
  setCurrentSnack: Dispatch<SetStateAction<number>>;
}

const SnackBtn = ({ articleId, authorType, setCurrentSnack }: Prop) => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleSnackGiver = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <Wrapper id="snack-wrapper">
        <Button onClick={handleSnackGiver}>
          {isOn ? (
            authorType === "DOG" ? (
              <BoneActiveIcon />
            ) : (
              <FishActiveIcon />
            )
          ) : authorType === "DOG" ? (
            <BoneIcon />
          ) : (
            <FishIcon />
          )}
        </Button>
        {isOn ? <SnackGiver articleId={articleId} setIsOn={setIsOn} setCurrentSnack={setCurrentSnack} /> : null}
      </Wrapper>
    </>
  );
};

export default SnackBtn;
