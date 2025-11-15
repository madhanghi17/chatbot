const API_KEY = "PUT-YOUR-OPENAI-KEY-HERE";
const chatBox = document.getElementById("chat");

async function sendMsg() {
  const input = document.getElementById("userInput");
  const userText = input.value;
  input.value = "";

  chatBox.innerHTML += `<p class='msg user'>You: ${userText}</p>`;

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userText }]
      })
    }
  );

  const data = await response.json();
  const botReply = data.choices[0].message.content;

  chatBox.innerHTML += `<p class='msg bot'>Bot: ${botReply}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
