import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const TypingEffect = () => {
  const targetText = "CURRENT DATE";
  const scrambledChars = "g.3&+F~P,o=qXNO";
  const [displayText, setDisplayText] = useState(scrambledChars);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        const newText = prevText
          .split("")
          .map((char, index) => (index <= currentIndex ? targetText[index] : char))
          .join("");
        return newText;
      });
      currentIndex++;
      if (currentIndex >= targetText.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant="h4" sx={{ fontFamily: "Manrope, sans-serif", fontWeight: 200 }}>
      {displayText}
    </Typography>
  );
};

export default TypingEffect;