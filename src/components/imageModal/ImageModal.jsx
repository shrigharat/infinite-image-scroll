import React, { useContext, useRef, useState } from "react";
import { ImagesContext } from "../../contexts/imagesContext";
import "./ImageModal.styles.scss";
import LeftIcon from "../../assets/icons/chevron-left.png";
import RightIcon from "../../assets/icons/chevron-right.png";
import useClickOutside from "../../hooks/useClickOutside";

const ImageModal = () => {
  const { images, currentImage, setShowImageModal } = useContext(ImagesContext);
  const [imageIndex, setImageIndex] = useState(currentImage);
  console.log({ imageIndex });

  const modalContentRef = useRef();
  useClickOutside(modalContentRef, () => setShowImageModal(false));

  return (
    <div className="image-modal">
      <div
        className="modal-overlay"
        // onClick={() => setShowImageModal(false)}
      ></div>
      <div className="modal-content" ref={modalContentRef}>
        {imageIndex > 0 ? (
          <div
            className="prev-button"
            onClick={() =>
              setImageIndex((prev) => {
                if (prev - 1 >= 0) {
                  return prev - 1;
                }
                return prev;
              })
            }
          >
            <img src={LeftIcon} alt="" />
          </div>
        ) : (
          <div
            className="next-button"
            style={{ backgroundColor: "transparent", cursor: "auto" }}
          ></div>
        )}

        <div className="image-container">
          <img src={images[imageIndex].url} alt="" />
        </div>

        {imageIndex < images.length - 1 ? (
          <div
            className="next-button"
            onClick={() =>
              setImageIndex((prev) => {
                if (prev + 1 < images.length) {
                  return prev + 1;
                }
                return prev;
              })
            }
          >
            <img src={RightIcon} alt="" />
          </div>
        ) : (
          <div
            className="next-button"
            style={{ backgroundColor: "transparent", cursor: "auto" }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
