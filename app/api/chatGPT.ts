import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.query;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  const promptText = prompt.toString(); // Convert prompt to string if necessary

  if (promptText.length > 1000) { // Increased the maximum prompt length
    return res.status(400).json({ error: "Prompt too long" });
  }

  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: promptText,
      max_tokens: 2048,
      temperature: 0.9,
      presence_penalty: 0,
      frequency_penalty: 0,
      top_p: 1.0,
    });

    const quote = completion.choices[0]
      ? completion.choices[0].text
      : "";

    res.status(200).json({ quote });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
}
