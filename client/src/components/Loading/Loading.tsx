import { Indicator } from "./style";

interface Prop {
  className?: string;
}

const Loading = ({ className }: Prop) => {
  return (
    <Indicator className={className}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Indicator>
  );
};

export default Loading;
