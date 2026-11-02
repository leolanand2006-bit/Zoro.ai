import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("ZORO AI is online!");
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: question
    });

    res.json({ answer: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI response failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`ZORO running on port ${PORT}`);
});
