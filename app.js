const API_KEY = "DIN_API_KEY_HER"; // 🔑 indsæt din nøgle her

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
