const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 ADD YOUR API KEY HERE
const API_KEY = "";

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a health assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    console.log("AI RESPONSE:", data);

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ reply: "AI failed ❌" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});