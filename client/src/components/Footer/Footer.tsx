import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  background-color: var(--color-madium-black);
`;

const MainBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--color-white);
  font-size: var(--fs-pc-small);

  p {
    margin: 15px;

    span {
      margin: 0px 20px;

      &:first-child {
        @media screen and (max-width: 736px) {
          margin-bottom: 20px;
        }
      }
    }

    @media screen and (max-width: 736px) {
      margin: 10px 0px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const GithubLink = styled.a`
  color: var(--color-white);
  text-decoration: none;
`;

const Footer = () => {
  return (
    <FooterContainer id="footer">
      <MainBox>
        <p>
          <span>대표이사</span>
          <span>
            <GithubLink href="https://github.com/jaybknd">김정민</GithubLink> /{" "}
            <GithubLink href="https://github.com/kugnas">남상욱</GithubLink> /{" "}
            <GithubLink href="https://github.com/appstew">조지선</GithubLink> /{" "}
            <GithubLink href="https://github.com/ssunip">송인선</GithubLink> /{" "}
            <GithubLink href="https://github.com/kyh1685">김윤희</GithubLink> /{" "}
            <GithubLink href="https://github.com/SuRyeon-Lee">이수련</GithubLink>
          </span>
        </p>
        <p>
          <span>Copyright 2022.cocoa All rights reserved</span>
        </p>
      </MainBox>
    </FooterContainer>
  );
};

export default Footer;
