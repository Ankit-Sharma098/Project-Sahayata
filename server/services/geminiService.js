import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzePollution = async (imageUrl) => {
  try {

    const image = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const base64 = Buffer.from(image.data).toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",

          parts: [

            {
              inlineData: {
                mimeType: "image/webp",
                data: base64,
              },
            },

            {
              text: `
You are an environmental pollution expert.

Analyze this pollution image.

Return ONLY JSON.

{
"predictedCategory":"",
"confidence":95,
"severity":"",
"recommendation":"",
"healthRisk":"",
"suggestedAuthority":""
}
`,
            },

          ],
        },
      ],
    });

    let result = response.text;

    result = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(result);

  } catch (err) {

    console.log("Gemini Error", err);

    return {

      predictedCategory: "Other",

      confidence: 0,

      severity: "Low",

      recommendation: "No recommendation",

      healthRisk: "Low",

      suggestedAuthority: "Municipality",

    };

  }
};