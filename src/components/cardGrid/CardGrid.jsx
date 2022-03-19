import { Spinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ImagesContext } from "../../contexts/imagesContext";
import ImageCard from "../imageCard/ImageCard";
import "./CardGrid.styles.scss";
import { motion } from "framer-motion";

const CardGrid = () => {
  const { images, loading, setCurrentImage, setShowImageModal, error } =
    useContext(ImagesContext);
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="card-grid">
      <motion.div
        className="cards-container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {React.Children.toArray(
          images.map((image, index) => (
              <ImageCard
                image={image}
                index={index}
                imagesLength={images.length}
                onClick={() => {
                  setCurrentImage(index);
                  setShowImageModal(true);
                }}
              />
          ))
        )}
      </motion.div>
      {loading && (
        <div className="loading-container">
          <Spinner />
        </div>
      )}
      {!loading && images.length === 0 ? (
        error ? (
          <div className="no-images">Something went wrong 😓</div>
        ) : (
          <div className="no-images">No images found ☹️</div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default CardGrid;
