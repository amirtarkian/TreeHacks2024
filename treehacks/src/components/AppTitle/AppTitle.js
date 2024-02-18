import React, { useState, useEffect } from "react";
import "./AppTitle.css"; // Ensure your CSS path is correct

const AppTitle = () => {
  const fullText1 = "Welcome to    ";
  const fullText2 = "TerraMetrix. . .";
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [isFirstLineComplete, setIsFirstLineComplete] = useState(false);

  useEffect(() => {
    if (!isFirstLineComplete) {
      if (text1.length < fullText1.length) {
        setTimeout(() => {
          setText1(fullText1.slice(0, text1.length + 1));
        }, 150); // Adjust speed of typing here
      } else {
        setIsFirstLineComplete(true);
      }
    } else if (text2.length < fullText2.length) {
      setTimeout(() => {
        setText2(fullText2.slice(0, text2.length + 1));
      }, 150); // Continue typing the second part
    }
  }, [text1, text2, isFirstLineComplete]);

  // Removed the condition that adds <br /> to keep the text on one line
  return (
    <h1 className="title">
      {text1}
      {text2}
      <span className="cursor"></span>
    </h1>
  );
};

export default AppTitle;
