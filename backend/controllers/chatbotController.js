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
  console.log("Response in the truncateResponse function: ", response);
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
  console.log("This is the truncated response: ", truncatedResponse);
  return truncatedResponse.trim();
};

const postMessage = async (req, res) => {
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

    console.log("OpenAI response data: ", response.data);
    console.log("OpenAI response text: ", response.data.choices[0].message.content);
    console.log("OpenAI response data choices: ", response.data.choices[0]);

    const chatbotResponse = response.data.choices[0].message.content;
    const reason = response.data.choices[0].finish_reason;
    const truncatedResponse = truncateResponse(chatbotResponse);
    context.push({ role: "system", content: reason === "stop" ? chatbotResponse : truncatedResponse });
    console.log("This is the context array: ", context);
    res.status(200).json({ chatbotResponse: reason === "stop" ? chatbotResponse : truncatedResponse });
  } catch (error) {
    console.error("This is the error: ", error);
    console.error("Error response data: ", error.response.data);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  postMessage,
};
