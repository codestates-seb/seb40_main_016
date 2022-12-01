/*
담당 : 이수련
생성 : 2022.11.15
수정 : 
  -2022.11.29(수련) onClick 받을 수 있도록 변경
소개 : 동그라미 아바타 컴포넌트
설명 : 
  - 예시 :  
    <Avatar
        width="150px"
        height="150px"
        bgUrl="링크"
        onClick={()=>{}}
      />
  - required : width, height
  - optional : bgUrl, onClick
*/
import { Wrapper } from "./style";

interface Prop {
  className?: string;
  bgUrl?: string;
  width: string;
  height: string;
  onClick?: () => void;
}

const Avatar = ({ className, bgUrl, width, height, onClick = () => {} }: Prop) => {
  return <Wrapper className={className} bgUrl={bgUrl} width={width} height={height} onClick={onClick}></Wrapper>;
};

export default Avatar;
