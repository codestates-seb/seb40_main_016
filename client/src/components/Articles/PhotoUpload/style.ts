import styled from "styled-components";

export const PhotoWrapper = styled.div`
  position: relative;
  height: 800px;
  text-align: end;

  .addPhoto {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 70px;
    margin: 20px;
    fill-opacity: 0.5;
    cursor: pointer;
  }
`;

export const CurrentPhoto = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PhotoChoiceWrapper = styled.label`
  display: block;
  text-align: center;
  padding: 220px 0;

  p {
    font-size: var(--fs-pc-large);
    color: var(--color-light-black);
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .emptyPhoto {
    width: 172px;
  }
`;

export const PhotoListWrapper = styled.div`
  position: fixed;
  left: 1%;
  top: 60%;
  display: flex;
  width: 600px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 30px;

  .addIcon {
    width: 50px;
    margin-left: 10px;
    fill: var(--color-white);
    cursor: pointer;
  }
`;

export const PhotoList = styled.div`
  display: flex;
`;

export const UploadButton = styled.label`
  cursor: pointer;
  border-style: none;
  border-radius: 15px;
  width: 150px;
  height: 40px;
  background-color: var(--color-orange);
  color: var(--color-white);
  font-size: var(--fs-pc-regular);
  box-shadow: "0px 3px 3px var(--color-gray)";
  padding: 7.5px 25px;

  &:hover {
    background-color: var(--color-red);
  }

  &:active {
    margin-left: 1px;
    margin-top: 1px;
    box-shadow: none;
  }
`;
