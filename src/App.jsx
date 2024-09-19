import { useState } from "react";
import "./App.css";
import hippoImage from "./assets/hippo.jpg";
import milkImage from "./assets/milk.jpeg";
import watermelonImage from "./assets/แตงโม.jpg";
import pumpkinImage from "./assets/ฟักทอง.jpg";
import grassImage from "./assets/หญ้า.jpg";

export default function App() {
  const [level, setLevel] = useState(0);
  const [mainImage, setMainImage] = useState(hippoImage);
  const [animation, setAnimation] = useState("");

  const increaseLevel = (amount, imageType) => {
    setLevel((prevLevel) => {
      const newLevel = prevLevel + amount;
      if (newLevel >= 100) {
        setMainImage(milkImage);
      }
      triggerAnimation(imageType);
      return newLevel;
    });
  };

  const triggerAnimation = (imageType) => {
    setAnimation(imageType);
    setTimeout(() => setAnimation(""), 600);
  };

  const resetLevel = () => {
    setLevel(0);
    setMainImage(hippoImage);
  };

  const imageSize = `${Math.min(500, 100 + level * 0.5)}px`;

  const handleDragStart = (e, imageType) => {
    e.dataTransfer.setData("imageType", imageType);
  };

  const handleDrop = (e) => {
    e.preventDefault(); 
    const imageType = e.dataTransfer.getData("imageType");
    if (imageType) {
      let amount = 0;
      if (imageType === "watermelon") amount = 5;
      else if (imageType === "pumpkin") amount = 10;
      else if (imageType === "grass") amount = 20;

      increaseLevel(amount, imageType);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="container">
     {/* เพิ่มข้อความที่นี่ */} 
      <h1>🦛 เกมให้อาหารหมูเด้ง 🦛</h1>

      <div
        className="main-image-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="level-display">Level {level}</div>
        <img
          src={mainImage}
          alt="Main"
          style={{ width: imageSize, height: imageSize }}
        />
      </div>

      <div className="image-row">
        <div
          className="image-button-container"
          draggable
          onDragStart={(e) => handleDragStart(e, "watermelon")}
        >
          <img
            src={watermelonImage}
            alt="แตงโม"
            className={`small-image ${animation === "watermelon" ? "animate" : ""}`}
          />
          <button onClick={() => increaseLevel(5, "watermelon")}>
          แตงโม (5)
          </button>
        </div>
        <div
          className="image-button-container"
          draggable
          onDragStart={(e) => handleDragStart(e, "pumpkin")}
        >
          <img
            src={pumpkinImage}
            alt="ฟักทอง"
            className={`small-image ${animation === "pumpkin" ? "animate" : ""}`}
          />
          <button onClick={() => increaseLevel(10, "pumpkin")}>
            ฟักทอง (10)
          </button>
        </div>
        <div
          className="image-button-container"
          draggable
          onDragStart={(e) => handleDragStart(e, "grass")}
        >
          <img
            src={grassImage}
            alt="หญ้า"
            className={`small-image ${animation === "grass" ? "animate" : ""}`}
          />
          <button onClick={() => increaseLevel(20, "grass")}>
            หญ้า (20)
          </button>
        </div>
      </div>

      <button className="reset-button" onClick={resetLevel}>
        เริ่มต้นใหม่
      </button>

      <div className="footer">
        คลิกหรือลากอาหารไปให้หมูเด้ง
      </div>
    </div>
  );
}
