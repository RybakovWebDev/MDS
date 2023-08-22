import { createRef, useEffect, useRef, useState } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import { postMessage } from "../../services/ChatbotService";
import { WhiteSpinner } from "../Utility/StyledComponents/StyledComponentsUtility";
import { StyledInputChatbot } from "../Utility/StyledComponents/StyledComponentsInput";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "chatbot",
      text: "Hello! I'm an AI assistant. You can ask me any questions related to movies. \nFor example I can make you a list of things to watch based on your request,\nor answer trivia questions. \nKeep in mind that my responses will be limited to about 450 words.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatWindowRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, { sender: "user", text: inputValue }]);
      setInputValue("");
      const chatbotResponse = await postMessage(inputValue);
      // const chatbotResponse = "Testing";
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "chatbot",
            text: chatbotResponse
              ? chatbotResponse
              : "Apologies, there seems to be an error. I can't respond right now 😥",
          },
        ]);
      }, 900);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='chatbot'>
      <div className='chatbot__messages' ref={chatWindowRef}>
        <TransitionGroup component={null}>
          {messages.map((message, i) => {
            const nodeRef = createRef();
            return (
              <CSSTransition
                key={i}
                timeout={500}
                classNames={message.sender === "user" ? "message-user" : "message-chatbot"}
                nodeRef={nodeRef}
              >
                <div className={message.sender === "user" ? "chatbot__user-message" : "chatbot__message"} ref={nodeRef}>
                  <Typography sx={{ whiteSpace: "pre-wrap" }}>{message.text}</Typography>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        {messages[messages.length - 1].sender === "user" && <WhiteSpinner size={30} sx={{ m: "2rem 0 0 2rem" }} />}
      </div>

      <form className='chatbot__input-form' onSubmit={handleSendMessage}>
        <StyledInputChatbot
          placeholder='Type your message'
          inputProps={{ "aria-label": "type your message", maxLength: 150 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton type='submit' aria-label='send' sx={{ borderRadius: 0 }}>
          <SendIcon sx={{ color: "#fff", width: "3rem" }} />
        </IconButton>
      </form>
    </div>
  );
};

export default Chatbot;
