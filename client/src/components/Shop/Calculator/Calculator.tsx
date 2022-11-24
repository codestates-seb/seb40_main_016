import CalcContent from "./CalcContent";
import { ReactComponent as FishIcon } from "../../../assets/img/fish-w-icon.svg";
import { ReactComponent as EqualIcon } from "../../../assets/img/equal-icon.svg";
import { ReactComponent as MinusIcon } from "../../../assets/img/minus-icon.svg";
import { Wrapper, CalcTitle, CalcMain } from "./style";

interface CalculatorProps {
  yummy: number;
  totalCost: number;
}

const Calculator = ({ yummy, totalCost }: CalculatorProps) => {
  return (
    <Wrapper>
      <CalcTitle diff={yummy - totalCost}>
        <FishIcon />
        <span>알 계산기</span>
      </CalcTitle>
      <CalcMain diff={yummy - totalCost}>
        <CalcContent title="보유 알" content={yummy} />
        <MinusIcon />
        <CalcContent title="선택 상품 가격" content={totalCost} />
        <EqualIcon />
        <CalcContent title="교환 후 남은 알" content={yummy - totalCost} />
      </CalcMain>
    </Wrapper>
  );
};

export default Calculator;
