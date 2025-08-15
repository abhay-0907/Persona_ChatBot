import React, { useState, useEffect } from "react";

function ChatMessage({ message }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // reset when message changes
    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30); // speed in ms

    return () => clearInterval(interval);
  }, [message]);

  return <div className="chat-message">{displayedText}</div>;
}

export default ChatMessage;
