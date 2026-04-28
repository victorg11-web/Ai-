const API_KEY = "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"; // 🔑 indsæt din nøgle her

async function send() {
  const input = document.getElementById("input").value;

  document.getElementById("chat").innerHTML +=
    "<p><b>Du:</b> " + input + "</p>";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du er en hjælpsom dansk AI." },
        { role: "user", content: input }
      ]
    })
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;

  document.getElementById("chat").innerHTML +=
    "<p><b>AI:</b> " + reply + "</p>";
}
