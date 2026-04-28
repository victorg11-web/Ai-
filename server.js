import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

let conversation = []; // memory

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  conversation.push({ role: "user", content: userMessage });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": "Bearer DIN_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: conversation.map(m => m.content).join("\n")
    })
  });

  const data = await response.json();
  const reply = data.output[0].content[0].text;

  conversation.push({ role: "assistant", content: reply });

  res.json({ reply });
});

app.listen(3000, () => console.log("Server kører på port 3000"));
