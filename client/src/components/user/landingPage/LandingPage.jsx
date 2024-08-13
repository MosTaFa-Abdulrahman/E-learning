import "./landingPage.scss";
import { useState } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

const LandingPage = () => {
  const carouselImages = [
    "https://media.istockphoto.com/id/1687037297/photo/a-multiracial-group-of-college-friends-looking-at-a-laptop.webp?b=1&s=170667a&w=0&k=20&c=Jwm5_pSpPqkHcaDhQsr1et_jXPHnJVdSPX4wqhXF8qQ=",
    "https://media.istockphoto.com/id/1340214470/photo/students-sit-on-the-steps-near-the-college-and-look-at-the-laptop-and-digital-tablet-and-talk.webp?b=1&s=170667a&w=0&k=20&c=VhNbleDeQz4sb_mxAoMKeVk6qT4D5V0ltql0Y7tm4qo=",
    "https://media.istockphoto.com/id/1467686544/photo/university-student-girl-friends-with-learning-books-walking-out-school-building.webp?b=1&s=170667a&w=0&k=20&c=-GkVqLKQLfDwAo2LFXutS7YQEP1nUZrxdeeJKpuarVg=",
    "https://media.istockphoto.com/id/1137020060/photo/college-student-in-casual-clothing.webp?b=1&s=170667a&w=0&k=20&c=cSV_YheI67gobQlVQiwk26mdlP9mD2DXRkJ3tr52zFU=",
  ];

  return (
    <div className="landing-page">
      <section className="main-content">
        <Carousel images={carouselImages} />
        <div className="right-content">
          <h2>نحن نقدم الدورة عبر الإنترنت في العالم العالمي</h2>
          <p>
            نحن نقدم نهجا جديدا لنماذج التعلم الأساسية. اختر من بين مجموعة واسعة
            من خيارات التعلم واكتسب مهارات جديدة! مركزنا معروف.
          </p>
          {/* You can add more content here, e.g., a button */}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
