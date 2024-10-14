import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
//import from dotenv
import { GROQ_API_KEY } from "../../../../mykey";

// Function to get text generation response
export async function askAI(prompt: string) {
  // Set up the OpenAI client using the custom groq endpoint
  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1", // Assuming GROQ uses this
    apiKey: GROQ_API_KEY, // Ensure the key is set
  });

  try {
    // Call the text generation function
    const { text } = await generateText({
      model: groq("llama3-8b-8192"), // Using the 'llama3-8b-8192' model
      prompt: prompt,
    });

    // Output the generated text
    // console.log(text);

    return text; // Return for further use
  } catch (error) {
    console.error("Error generating text:", error);
    throw error; // Handle the error as needed
  }
}

//   // // for Together.ai. Get your api-key and save it in .env file with TOGETHER_API_KEY name
//   const openai = createOpenAI({
//     baseURL: "https://api.together.xyz/v1",
//     apiKey: process.env.TOGETHER_API_KEY,
//   });

//   const result = await streamText({
//     model: openai("meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo"),
//     prompt: prompt,
//   });

// // For Fireworks.ai. Get your api-key and save it in .env file with FIREWORKS_API_KEY name
// const openai = createOpenAI({
//   baseURL:'https://api.fireworks.ai/inference/v1',
//   apiKey: process.env.FIREWORKS_API_KEY
// });

// const result = await streamText({
//   model: openai('accounts/fireworks/models/llama-v3p1-405b-instruct'),
//   prompt: prompt
// });
