import { Indicator } from "./style";

const Loading = () => {
  return (
    <Indicator>
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
