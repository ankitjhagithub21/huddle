

const UploadAndDisplayImage = ({onImageChange,imageURLs}) => {
  

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={onImageChange} />
      <div className="grid lg:grid-cols-5 grid-cols-3 gap-3">
        {imageURLs.map((imageSrc, index) => (
          <img key={index} src={imageSrc} alt="Preview" />
        ))}
      </div>
    </div>
  );
};

export default UploadAndDisplayImage;
