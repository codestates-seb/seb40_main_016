/*
담당 : 이수련
생성 : 2022.11.15
수정 : -
소개 : 동그라미 아바타 컴포넌트
설명 : 
  - 예시 :  
    <Avatar
        width="150px"
        height="150px"
        bgUrl="링크"
      />
  - required : width, height
  - optional : bgUrl
*/
import { Wrapper } from "./style";

interface Prop {
  className?: string;
  bgUrl?: string;
  width: string;
  height: string;
}

const Avatar = ({ className, bgUrl, width, height }: Prop) => {
  return <Wrapper className={className} bgUrl={bgUrl} width={width} height={height}></Wrapper>;
};

export default Avatar;
