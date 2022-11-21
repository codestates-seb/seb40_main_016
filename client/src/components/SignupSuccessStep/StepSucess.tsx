import styled from "styled-components";

export const Notice = styled.div`
  padding: 60px 0 80px;
  font-size: var(--fs-pc-large);
  text-align: center;
`;

const StepSuccess = () => {
  return <Notice> 회원가입에 성공하였습니다!</Notice>;
};
export default StepSuccess;
