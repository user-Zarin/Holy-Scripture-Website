import React, { useState, useEffect } from "react";

const FirstScreen = () => {
  const images = [
    "https://plus.unsplash.com/premium_photo-1677587536653-0d02efbb70ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cXVyYW4lMjB2ZXJzZXN8ZW58MHx8MHx8fDA%3D",
    "https://i.ytimg.com/vi/S4RN6imMO8Y/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gEyh9MA8=&rs=AOn4CLAX_ORSg7eUUbOYy_Bai1JIyQMsbA",
    "https://i.ytimg.com/vi/uprYj4MZ3lE/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gEyh3MA8=&rs=AOn4CLClwCjD2mgFqVAVWUv6J3prNWFPDA",
    "https://i.ytimg.com/vi/oNWAAu2l-jA/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGF0gQShlMA8=&rs=AOn4CLAPtj7DAsvKTzTT61BEF8loPRqXqQ",
    "https://og.qurancdn.com/api/og/chapter/55?lang=en"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="carousel-container" style={{ textAlign: "center" }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className="slides"
          style={{
            display: index === currentIndex ? "block" : "none",
            width: "100%",
            height: "60vh",
            objectFit: "cover",
          }}
        />
      ))}
    </div>
  );
};

export default FirstScreen;
