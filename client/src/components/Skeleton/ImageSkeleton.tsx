import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const ImgSkeleton = styled.div`
  aspect-ratio: 1;
`;

const ImageSkeleton = () => {
  return (
    <ImgSkeleton>
      <Skeleton style={{ width: "100%", height: "100%" }} />
    </ImgSkeleton>
  );
};

export default ImageSkeleton;
