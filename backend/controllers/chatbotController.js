const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const context = [
  {
    role: "system",
    content:
      "You are designed to only talk about movies, tv shows and related topics and will refuse to talk about anything else. Keep your responses concise and short, if user question leads to a response longer than 150 tokens, apologize instead.",
  },
];

const truncateResponse = (response) => {
  let truncatedResponse = response;

  if (truncatedResponse.slice(-1) !== "." && !/\d/.test(truncatedResponse.slice(-1))) {
    const lines = truncatedResponse.split("\n");
    const lastLine = lines[lines.length - 1];
    if (!lastLine.endsWith(".") && !/\d/.test(lastLine.slice(-1))) {
      if (lastLine.trim() !== "") {
        lines.pop();
      }
    }
    truncatedResponse = lines.join("\n");
  }
  return truncatedResponse.trim();
};

const postMessage = async (req, res, next) => {
  const { userMessage } = req.body;

  console.log("User message input: ", userMessage);

  context.push({ role: "user", content: userMessage });

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 200,
      temperature: 0.7,
      n: 1,
      stream: false,
      messages: context,
    });

    const chatbotResponse = response.data.choices[0].message.content;
    const reason = response.data.choices[0].finish_reason;
    const truncatedResponse = truncateResponse(chatbotResponse);
    context.push({ role: "system", content: reason === "stop" ? chatbotResponse : truncatedResponse });
    res.status(200).json({ chatbotResponse: reason === "stop" ? chatbotResponse : truncatedResponse });
  } catch (error) {
    console.error("This is the error: ", error);
    console.error("Error response data: ", error.response.data);
    err.customMessage = "Something went wrong";
    next(err);
  }
};

module.exports = {
  postMessage,
};
