import { Wrapper, Title, Intro, Section, Desc, Photo } from "./style";

const ProjectIntro = () => {
  return (
    <>
      <Wrapper>
        <Title>내 밥은 내가 번다냥!</Title>
        <Intro>
          내 밥은 내가 번다냥은 반려동물의 사진과 글을 올리는 서비스입니다.
          <br />
          동물 계정으로 가입해 사진을 올리고 좋아요와 간식을 받아보세요! 간식을 모으면 상점에서 간식과 물품을 교환할 수
          있습니다.
          <br />
          사람 계정으로 가입해 좋아하는 동물에게 간식을 선물해보세요! 좋아하는 동물에게 실제 간식과 교환할 수 있는 알을
          선물할 수 있습니다.
        </Intro>
        <Section className="ratio7-3">
          <Desc>
            <h3>헤더</h3>
            <img src="./assets/header.png" alt="" width="1000px" />
            <ul>
              <li>로고를 누르면 메인 페이지로 돌아올 수 있습니다.</li>
              <li>
                검색창에서 검색어를 입력하고 엔터를 누르면 해당 키워드가 이름인 유저 혹은 키워드를 포함하고 있는 글이
                검색됩니다.
              </li>
              <li>우측 아이콘은 차례대로 글 작성, 상점 이동, 마이페이지 이동, 로그아웃을 할 수 있습니다.</li>
            </ul>
          </Desc>
          {/* <Photo><img src="./assets/cat-selfie-clipart.png" alt="" /></Photo> */}
        </Section>
        <Section className="ratio7-3">
          <Desc>
            <h3>마이페이지</h3>
            <ul>
              <img src="./assets/my-page.png" alt="" width="1000px" />
              <li>
                <p>
                  좌측 상단의 아이콘은 필터입니다. 각각 전체, 강아지, 고양이, 내가 구독한 계정 게시물로 필터링할 수
                  있습니다.
                </p>
                <img src="./assets/my-page-filter.png" alt="" />
              </li>
              <li>
                <p>우측 상단의 버튼은 정렬입니다. New는 최신순, Favorite은 좋아요순으로 정렬할 수 있습니다.</p>
                <img src="./assets/my-page-sort.png" alt="" />
              </li>
              <li>
                <p>사진을 클릭하면 상세페이지로 이동할 수 있습니다.</p>
                <img src="./assets/imageCard.png" alt="" />
              </li>
            </ul>
          </Desc>
          {/* <Photo><img src="./assets/cat-selfie-clipart.png" alt="" /></Photo> */}
        </Section>
        <Section className="ratio3-7">
          {/* <Photo><img src="./assets/cat-selfie-clipart.png" alt="" /></Photo> */}
          <Desc>
            <h3>상세 페이지</h3>
            <ul>
              <li></li>
            </ul>
          </Desc>
        </Section>
      </Wrapper>
    </>
  );
};

export default ProjectIntro;
