import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <nav>
        <div className="logo">My Portfolio</div>
        <div className="nav-links">
          <a href="../../index.html">Home</a>
          <a href="../../cv.html">About me</a>
          <a href="../../blog.html">Blog</a>
          <a href="../../photography.html">Gallery</a>
        </div>
      </nav>

      <header>
        <h1>Photography Gallery</h1>
        <p>Explore my collection of photographs.</p>
      </header>

      <section className="container">
        <div>
          <h1>The pictures may take longer :/ Sorry</h1>
        </div>
        <div className="gallery">
                {[
                "../../assets/DSC_2715.jpg",
                "../../assets/DSC_2147.jpg",
                "../../assets/DSC_3055.jpg",
                "../../assets/DSC_3090.jpg",
                "../../assets/DSC_3115.jpg",
                "../../assets/DSC_2338.jpg",
                "../../assets/DSC_3018.jpg",
                "../../assets/DSC_2145.jpg",
                "../../assets/DSC_9170.jpg",
                "../../assets/DSC_3188.jpg",
                "../../assets/DSC_1646.jpg",
                "../../assets/DSC_9610.jpg",
                "../../assets/DSC_3151.jpg",
                "../../assets/DSC_3302.jpg",
                "../../assets/DSC_3055-2.jpg",
                "../../assets/DSC_1880.jpg",
                "../../assets/DSC_3251.jpg",
                "../../assets/DSC_2387.jpg",
                "../../assets/DSC_2440.jpg",
                "../../assets/DSC_3060.jpg",
                "../../assets/DSC_2508.jpg",
                "../../assets/DSC_1636.jpg",
                "../../assets/DSC_9766.jpg",
                "../../assets/DSC_9796.jpg",
                "../../assets/DSC_2743.jpg",
                "../../assets/DSC_9797.jpg",
                "../../assets/DSC_2486.jpg",
                "../../assets/DSC_3138.jpg",
                "../../assets/DSC_3102-2.jpg",
                "../../assets/DSC_3117.jpg",
                "../../assets/DSC_2516.jpg"
            // Add more images here
          ].map((src, index) => (
            <div
              key={index}
              className="box"
              onClick={() => openModal(src)}
            >
              <img src={src} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
      </section>

      {modalImage && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content">
            <img
              src={modalImage}
              alt="Modal"
              className={
                modalImage.includes("portrait") ? "portrait" : "landscape"
              }
            />
          </div>
        </div>
      )}

      <footer>&copy; 2024 My Portfolio</footer>
    </div>
  );
};

export default App;

