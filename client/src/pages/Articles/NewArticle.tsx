import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Modal from "../../components/Modal/Modal";
import PhotoUpload from "../../components/Articles/PhotoUpload/PhotoUpload";
import WriteArticle from "../../components/Articles/WriteArticle/WriteArticle";

import { Images, UploadedPhotos } from "../../types/article";
import { RegisterArticle, UpdateArticle, GetDetail } from "../../api/article";
import accessTokenState from "../../_state/accessTokenState";

interface ArticleProps {
  isOn: boolean;
  isEdit?: boolean;
  setIsOn: (arg: boolean) => void;
  setIsEdit: (arg: boolean) => void;
  articleId: number;
}

const NewArticle = ({ isOn, isEdit = false, setIsOn, setIsEdit, articleId }: ArticleProps) => {
  const token = useRecoilValue(accessTokenState);
  const location = useLocation();
  const [isPhoto, setIsPhoto] = useState<boolean>(true);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhotos[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState<string>("");
  const [isAddPhoto, setIsAddPhoto] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [deletePhotos, setDeletePhotos] = useState<string[]>([]);

  const handlePhoto = () => {
    setIsPhoto(() => true);
  };

  const resetPhoto = () => {
    setIsPhoto(() => true);
    setUploadedPhotos(() => []);
    setPreviewPhotos(() => []);
    setCurrentPhotos(() => "");
    setContent(() => "");
    setIsEdit(false);
    setIsAddPhoto(false);
  };

  const submitNewArticle = () => {
    if (content.length <= 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();

    if (isEdit) {
      for (let uploadedPhoto of uploadedPhotos) {
        if (uploadedPhoto.file) formData.append("add", uploadedPhoto.file);
      }

      const body = {
        content: content,
        delete: deletePhotos,
      };

      formData.append(
        "patchDto",
        new Blob([JSON.stringify(body)], {
          type: "application/json",
        }),
      );

      UpdateArticle(formData, articleId, token)
        .then((res: any) => {
          if (res.status === 200) {
            alert("글 수정 완료😺");

            if (location.pathname === "/" || location.pathname === "/mypage") {
              window.location.reload();
            } else {
              setIsOn(false);
            }
          }
        })
        .catch((e) => {
          alert("글 수정 실패😿");
        });
    } else {
      for (let uploadedPhoto of uploadedPhotos) {
        if (uploadedPhoto.file) formData.append("file", uploadedPhoto.file);
      }

      formData.append(
        "postDto",
        new Blob([JSON.stringify(content)], {
          type: "application/json",
        }),
      );

      RegisterArticle(formData, token)
        .then((res: any) => {
          if (res.status === 201) {
            alert("글 작성 완료😺");

            if (location.pathname === "/" || location.pathname === "/mypage") {
              window.location.reload();
            } else {
              setIsOn(false);
            }
          }
        })
        .catch((e) => {
          alert("글 작성 실패😿");
        });
    }
  };

  useEffect(() => {
    if (isEdit) {
      GetDetail(articleId, token).then((res: any) => {
        setContent(() => res.data.content);

        setUploadedPhotos((photos) => [
          ...photos,
          ...res.data.articleImg.images.map((image: Images) => {
            return { uploadedPhoto: image.imgUrl };
          }),
        ]);
      });
    }
  }, [articleId, isEdit]);

  return (
    <Modal
      title={isEdit ? "게시물 수정하기" : "새 게시물 만들기"}
      maxWidth={isPhoto ? "680px" : "1200px"}
      titleBtn={isPhoto ? (uploadedPhotos.length > 0 ? "next" : "none") : "done"}
      bg={true}
      isOn={isOn}
      setIsOn={setIsOn}
      onTitlePrevBtnClick={handlePhoto}
      onCloseBefore={resetPhoto}
      onTitleBtnClick={isPhoto ? () => setIsPhoto(() => false) : submitNewArticle}
    >
      {isPhoto ? (
        <PhotoUpload
          uploadedPhotos={uploadedPhotos}
          previewPhotos={previewPhotos}
          currentPhotos={currentPhotos}
          isAddPhoto={isAddPhoto}
          setUploadedPhotos={setUploadedPhotos}
          setPreviewPhotos={setPreviewPhotos}
          setCurrentPhotos={setCurrentPhotos}
          setIsAddPhoto={setIsAddPhoto}
          setDeletePhotos={setDeletePhotos}
        />
      ) : (
        <WriteArticle uploadedPhotos={uploadedPhotos} content={content} setContent={setContent} />
      )}
    </Modal>
  );
};

export default NewArticle;
