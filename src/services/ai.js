const ollama = require("ollama").default;

const generateResponse = async (prompt, model = "llama3.2:latest") => {
  const response = await ollama.chat({
    model: model,
    messages: [{ role: "user", content: prompt }],
    stream: false,
  });
  return response.message.content;
};

module.exports = { generateResponse };
