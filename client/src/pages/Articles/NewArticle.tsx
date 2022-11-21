import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import PhotoUpload from "../../components/Articles/PhotoUpload/PhotoUpload";
import WriteArticle from "../../components/Articles/WriteArticle/WriteArticle";
import { registerArticle } from "../../api/article";

interface ArticleProps {
  isOn: boolean;
  setIsOn: (arg: boolean) => void;
}

const NewArticle = ({ isOn, setIsOn }: ArticleProps) => {
  const [isPhoto, setIsPhoto] = useState<boolean>(true);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");

  const handlePhoto = () => {
    setIsPhoto(() => true);
    setIndex(() => 0);
  };

  const resetPhoto = () => {
    setIsPhoto(() => true);
    setUploadedPhotos(() => []);
    setPreviewPhotos(() => []);
    setCurrentPhotos(() => "");
  };

  const submitNewArticle = () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }

    formData.append("content", JSON.stringify(content));

    registerArticle(formData).then((res: any) => {
      if (res.status(201)) alert("글 작성 완료!");
    });
  };

  return (
    <Modal
      title="새 게시물 만들기"
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
          // formData={formData}
          setFiles={setFiles}
        />
      ) : (
        <WriteArticle uploadedPhotos={uploadedPhotos} setContent={setContent} index={index} setIndex={setIndex} />
      )}
    </Modal>
  );
};

export default NewArticle;
