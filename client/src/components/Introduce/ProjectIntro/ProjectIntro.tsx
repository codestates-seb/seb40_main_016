import { Wrapper, Title, Intro, Section, Desc, Photo } from "./style";

const ProjectIntro = () => {
  return (
    <>
      <Wrapper>
        <Title>내 밥은 내가 번다냥!</Title>
        <Intro>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          <br />
          Tenetur molestias eveniet aliquam a atque incidunt iste explicabo vel, expedita fugiat?
        </Intro>
        <Section className="ratio7-3">
          <Desc>
            <h3>부제</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum enim, pariatur mollitia aut beatae
              exercitationem debitis ipsa quam placeat. Porro voluptate fugit id amet rem, accusamus excepturi dolores
              architecto beatae incidunt ipsa ut! Distinctio autem maiores modi maxime architecto magni tempore illo sit
              provident quaerat nihil itaque nam sint qui ea commodi neque molestiae culpa consequatur, recusandae non.
              Temporibus nisi molestias, voluptatem obcaecati, totam sit ipsa non assumenda ipsum maiores eius sed
              reiciendis modi odio quos. Tempore in dolor eaque voluptates culpa a sunt neque officiis iste aut. Nihil
              ut veritatis cumque ipsa nemo vero natus voluptatem molestias animi quia.
            </p>
          </Desc>
          <Photo>
            <img src="./assets/cat-selfie-clipart.png" alt="" />
          </Photo>
        </Section>
        <Section className="ratio3-7">
          <Photo>
            <img src="./assets/cat-selfie-clipart.png" alt="" />
          </Photo>
          <Desc>
            <h3>부제</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum enim, pariatur mollitia aut beatae
              exercitationem debitis ipsa quam placeat. Porro voluptate fugit id amet rem, accusamus excepturi dolores
              architecto beatae incidunt ipsa ut! Distinctio autem maiores modi maxime architecto magni tempore illo sit
              provident quaerat nihil itaque nam sint qui ea commodi neque molestiae culpa consequatur, recusandae non.
              Temporibus nisi molestias, voluptatem obcaecati, totam sit ipsa non assumenda ipsum maiores eius sed
              reiciendis modi odio quos. Tempore in dolor eaque voluptates culpa a sunt neque officiis iste aut. Nihil
              ut veritatis cumque ipsa nemo vero natus voluptatem molestias animi quia.
            </p>
          </Desc>
        </Section>
      </Wrapper>
    </>
  );
};

export default ProjectIntro;
