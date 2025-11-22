// lib/openai.js
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateDescription(prompt) {
  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",   
      messages: [
        { role: "system", content: "You create short, clean descriptions for a portfolio website." },
        { role: "user", content: prompt }
      ]
    })

    return res.choices[0].message.content
  } catch (err) {
    console.error("OpenAI generation error:", err)
    throw err
  }
}

export async function generateThumbnail(prompt) {
  try {
    const img = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    })

    return img.data[0].url
  } catch (err) {
    console.error("OpenAI image generation error:", err)
    throw err
  }
}
