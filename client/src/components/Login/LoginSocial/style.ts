import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 30px;
`;

export const Title = styled.p`
  margin-bottom: 10px;
  color: var(--color-gray);
  text-align: center;
`;

const handleColorType = (sort: "google" | "naver" | "github") => {
  switch (sort) {
    case "google":
      return "#f75755";
    case "naver":
      return "#03c75a";
    case "github":
      return "#444444";
    default:
      return `var(--color-ivory)`;
  }
};

const handleHoverColorType = (sort: "google" | "naver" | "github") => {
  switch (sort) {
    case "google":
      return "#e24444";
    case "naver":
      return "#14ad51";
    case "github":
      return "#2d2d2d";
    default:
      return `var(--color-ivory)`;
  }
};

export const GroupSocialBtn = styled.div`
  display: flex;
  justify-content: center;
`;

export const SocialBtn = styled.button<{ sort: "google" | "naver" | "github" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;

  border: none;
  border-radius: 15px;
  background-color: ${(props) => handleColorType(props.sort)};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => handleHoverColorType(props.sort)};
  }

  > svg {
    height: ${(props) => (props.sort === "github" ? "25px" : "20px")};
  }
`;
