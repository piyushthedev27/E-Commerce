export async function generateDescription(prompt) {
  const apiKey = process.env.GEMINI_API_KEY
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  })

  const data = await response.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
}
