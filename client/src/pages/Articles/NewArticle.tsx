import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

import Modal from "../../components/Modal/Modal";
import PhotoUpload from "../../components/Articles/PhotoUpload/PhotoUpload";
import WriteArticle from "../../components/Articles/WriteArticle/WriteArticle";

import { UploadedPhotos } from "../../types/article";
import { RegisterArticle, UpdateArticle, GetDetail } from "../../api/article";
import accessTokenState from "../../_state/accessTokenState";

interface ArticleProps {
  isOn: boolean;
  isEdit?: boolean;
  setIsOn: (arg: boolean) => void;
  articleId: number;
}

const NewArticle = ({ isOn, isEdit = false, setIsOn, articleId }: ArticleProps) => {
  const token = useRecoilValue(accessTokenState);
  const [isPhoto, setIsPhoto] = useState<boolean>(true);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhotos[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handlePhoto = () => {
    setIsPhoto(() => true);
  };

  const resetPhoto = () => {
    setIsPhoto(() => true);
    setUploadedPhotos(() => []);
    setPreviewPhotos(() => []);
    setCurrentPhotos(() => "");
  };

  const submitNewArticle = () => {
    const formData = new FormData();

    for (let uploadedPhoto of uploadedPhotos) {
      if (uploadedPhoto.file) formData.append("image", uploadedPhoto.file);
    }
    formData.append("content", JSON.stringify(content));

    if (isEdit) {
      UpdateArticle(formData, articleId, token).then((res: any) => {
        if (res.status(200)) alert("글 수정 완료!");
      });
    } else {
      RegisterArticle(formData, token).then((res: any) => {
        if (res.status(201)) alert("글 작성 완료!");
      });
    }
  };

  useEffect(() => {
    if (isEdit) {
      GetDetail(articleId, token).then((res: any) => {
        setContent(() => res.data.content);

        //현재 articleId에 해당하는 이미지 배열로 들어오지 않아 오류남
        // setUploadedPhotos((photos) => [
        //   ...photos,
        //   ...res.data.images.map((image: string) => {
        //     return { uploadedPhoto: image };
        //   }),
        // ]);
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
          setUploadedPhotos={setUploadedPhotos}
          setPreviewPhotos={setPreviewPhotos}
          setCurrentPhotos={setCurrentPhotos}
        />
      ) : (
        <WriteArticle uploadedPhotos={uploadedPhotos} content={content} setContent={setContent} />
      )}
    </Modal>
  );
};

export default NewArticle;
