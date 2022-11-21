export const FileFormatCheck = (file: File) => {
  if (!file.type.startsWith("image/")) {
    return false;
  }
  return true;
};

export const FileSizeCheck = (file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    alert("업로드 가능한 최대 용량은 5MB입니다. ");
    return false;
  }
  return true;
};
