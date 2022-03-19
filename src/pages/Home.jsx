import React, { useContext } from "react";
import CardGrid from "../components/cardGrid/CardGrid";
import Header from "../components/header/Header";
import ImageModal from "../components/imageModal/ImageModal";
import { ImagesContext } from "../contexts/imagesContext";
import "./Home.styles.scss";

const Home = () => {
  const { showImageModal } = useContext(ImagesContext);

  return (
    <div className="home-page">
      {showImageModal && <ImageModal />}
      <Header />
      <CardGrid />
    </div>
  );
};

export default Home;
