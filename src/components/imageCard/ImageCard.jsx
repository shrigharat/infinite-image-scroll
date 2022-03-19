import React, { useContext } from "react";
import { ImagesContext } from "../../contexts/imagesContext";
import "./ImageCard.styles.scss";
import { motion } from "framer-motion";

const ImageCard = ({ image, index, imagesLength, onClick }) => {
  const { lastElementRef } = useContext(ImagesContext);

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return index + 1 === imagesLength ? (
    <motion.div
      variants={item}
      className="image-card"
      ref={lastElementRef}
      onClick={onClick}
    >
      <img src={image.url} alt="" onClick={onClick} />
      <div className="img-content">
        <span className="img-title">{image.title.slice(0, 9) + "..."}</span>
        <span className="img-author">
          by <div className="author">{image.owner.slice(0, 13) + "..."}</div>
        </span>
      </div>
    </motion.div>
  ) : (
    <motion.div variants={item} className="image-card" onClick={onClick}>
      <img src={image.url} alt="" />
      <div className="img-content">
        <span className="img-title">{image.title.slice(0, 13) + "..."}</span>
        <span className="img-author">
          by <div className="author">{image.owner.slice(0, 13) + "..."}</div>
        </span>
      </div>
    </motion.div>
  );
};

export default ImageCard;
