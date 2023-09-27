import axios from "axios";

export const postMessage = async (userMessage) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URI}/api/chatbot`, { userMessage: userMessage.trim() });
    return response.data.chatbotResponse;
  } catch (err) {
    console.error("Can't send message: ", err);
    throw err;
  }
};
