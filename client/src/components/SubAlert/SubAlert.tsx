import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

import accessTokenState from "../../_state/accessTokenState";

import { ReactComponent as MansaeCat } from "../../assets/img/mansae-cat.svg";

import sound from "../../assets/sound/cartoon-pop-clean.mp3";

const EventSource = EventSourcePolyfill || NativeEventSource;

const movein = () => keyframes`
  from {right: -200px;}
  to {right: 20px;}
`;

const moveout = () => keyframes`
  from {right: 20px;}
  to {right: -400px;}
`;

const SubscribeAlert = styled.div`
  padding: 10px 16px;
  position: fixed;
  top: 30%;
  right: 3%;
  height: 90px;
  background-color: #ffffffe6;
  z-index: 25;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: var(--color-light-black);
  box-shadow: 0px 3px 10px var(--color-gray);
  animation: ${movein} 0.5s ease forwards, ${moveout} 0.5s 3s ease forwards;

  @media screen and (max-width: 736px) {
    height: 60px;
  }
`;

const AlertContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .alert-cat {
    width: 50px;
    margin-bottom: 10px;

    @media screen and (max-width: 736px) {
      width: 40px;
    }
  }

  p {
    font-size: var(--fs-pc-small);
    font-weight: 700;

    @media screen and (max-width: 736px) {
      font-size: var(--fs-pc-xsmall);
    }
  }
`;

const SubAlert = () => {
  const token = useRecoilValue(accessTokenState);
  const [sseContent, setSseContent] = useState();
  const [openSubAlert, setOpenSubAlert] = useState<Boolean>(false);
  const lsatId = useRef(null);

  const popUpSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleOpenSubAlert = () => {
    setOpenSubAlert(true);
  };

  const onClick = () => {
    setOpenSubAlert(false);
  };

  useEffect(() => {
    const onConnectSse = () => {
      if (token) {
        const eventSourceInitDict = {
          headers: {
            Authorization: `${token}`,
            "Last-Event_ID": `${lsatId.current}`,
          },
        };

        const eventSource = new EventSource(`https://api.givemesnack.me/sse`, eventSourceInitDict);

        eventSource.onmessage = (event: any) => {
          const data = event.data;

          if (!data.includes("EventStream is Created")) {
            const data = JSON.parse(event.data);
            handleOpenSubAlert();
            popUpSound();
            setSseContent(data.content);
            lsatId.current = event.lastEventId;
            setTimeout(() => {
              setOpenSubAlert(false);
            }, 6000);
          }
        };

        eventSource.onerror = () => {
          eventSource.close();
        };
      }
    };

    onConnectSse();

    (function loop() {
      setTimeout(() => {
        onConnectSse();
        loop();
      }, 10000);
    })();
  }, [token]);

  return (
    <>
      {openSubAlert && (
        <SubscribeAlert onClick={onClick}>
          <AlertContent>
            <MansaeCat className="alert-cat" />
            <p>{sseContent}</p>
          </AlertContent>
        </SubscribeAlert>
      )}
    </>
  );
};

export default SubAlert;