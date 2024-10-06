// import { createResource } from "@/lib/actions/resources";
// import { findRelevantContent } from "@/lib/ai/embedding";
// import { openai } from "@ai-sdk/openai";
// import { convertToCoreMessages, generateObject, LanguageModelV1, streamText, tool } from "ai";
// import { z } from "zod";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = await streamText({
//     model: openai('gpt-4o') as LanguageModelV1,
//     messages: convertToCoreMessages(messages),
//     system: `You are an expert astronomer assistant specialized in planetary orbital data.
//     You have the following Keplerian orbital data and accuracy information for the planets in the Solar System, extracted from tables valid for different time intervals.
//     Your purpose is to answer any questions related to space, planets, and the provided data with concise but accurate explanations. Ask if the user would like more information.
//     Use the tools provided to retrieve information from your knowledge base.
//     When answering questions, ensure your responses are long, informative, and focused on the topics of space and planets.
//     If a user presents new information about space or planets, use the addResource tool to store it.
//     If a response requires multiple tools, call one tool after another without responding to the user.
//     If a response requires information from an additional tool to generate a response, call the appropriate tools in order before responding to the user.
//     Only respond to questions using information from tool calls.
//     If no relevant information is found in the tool calls, respond, "I'm sorry, I don't have that information."
//     Be sure to adhere to any instructions in tool calls; if they say to respond like "...", do exactly that.
//     If the relevant information is not a direct match to the user's prompt, you can be creative in deducing the answer.
//     Keep responses detailed and descriptive.
//     Use your abilities as a reasoning machine to answer questions based on the information you have.
//     `,
//     tools: {
//       addResource: tool({
//         // description: `Add planetary or space-related resources to your knowledge base.
//         //   If the user provides new information about space or planets, use this tool without asking for confirmation.`,
//         description: `Add planetary or space-related resources to your knowledge base, use this tool without asking for confirmation.`,
//         parameters: z.object({
//           content: z
//             .string()
//             .describe("The content or resource to add to the knowledge base"),
//         }),
//         execute: async ({ content }) => createResource({ content }),
//       }),
//       getInformation: tool({
//         description: `Retrieve planetary orbital data and related information from your knowledge base to answer questions.`,
//         parameters: z.object({
//           question: z.string().describe("The user's question"),
//           similarQuestions: z
//             .array(z.string())
//             .describe("Keywords or topics to search"),
//         }),
//         execute: async ({ similarQuestions }) => {
//           const results = await Promise.all(
//             similarQuestions.map(
//               async (question) => await findRelevantContent(question),
//             ),
//           );
//           // Flatten the array of arrays and remove duplicates based on 'name'
//           const uniqueResults = Array.from(
//             new Map(results.flat().map((item) => [item?.name, item])).values(),
//           );
//           return uniqueResults;
//         },
//       }),
//       understandQuery: tool({
//         description: `Analyze the user's query to determine relevant topics and information to retrieve. Use this tool on every prompt.`,
//         parameters: z.object({
//           query: z.string().describe("The user's query"),
//           toolsToCallInOrder: z
//             .array(z.string())
//             .describe(
//               "These are the tools you need to call in the order necessary to respond to the user's query",
//             ),
//         }),
//         execute: async ({ query }) => {
//           const { object } = await generateObject({
//             model: openai('gpt-4o') as LanguageModelV1,
//             system:
//               "You are a query understanding assistant specialized in astronomy. Analyze the user's query and generate similar questions related to space and planets.",
//             schema: z.object({
//               questions: z
//                 .array(z.string())
//                 .max(3)
//                 .describe(
//                   "Similar questions related to the user's query about space and planets. Be concise.",
//                 ),
//             }),
//             prompt: `Analyze this query: "${query}". Provide the following:
//                     3 similar questions that could help answer the user's query about space and planets.`,
//           });
//           return object.questions;
//         },
//       }),
//     },
//   });

//   return result.toDataStreamResponse();
// }

import { NextResponse } from 'next/server';
import { createResource } from "@/lib/actions/resources";
import { findRelevantContent } from "@/lib/ai/embedding";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, generateObject, LanguageModelV1, streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o') as LanguageModelV1,
    messages: convertToCoreMessages(messages),
    system: `You are an expert astronomer assistant specialized in planetary orbital data.
    You have the following Keplerian orbital data and accuracy information for the planets in the Solar System, extracted from tables valid for different time intervals.
    Your purpose is to answer any questions related to space, planets, and the provided data with concise but accurate explanations. Ask if the user would like more information.
    Use the tools provided to retrieve information from your knowledge base.
    When answering questions, ensure your responses are long, informative, and focused on the topics of space and planets.
    If a user presents new information about space or planets, use the addResource tool to store it.
    If a response requires multiple tools, call one tool after another without responding to the user.
    If a response requires information from an additional tool to generate a response, call the appropriate tools in order before responding to the user.
    Only respond to questions using information from tool calls.
    If no relevant information is found in the tool calls, respond, "I'm sorry, I don't have that information."
    Be sure to adhere to any instructions in tool calls; if they say to respond like "...", do exactly that.
    If the relevant information is not a direct match to the user's prompt, you can be creative in deducing the answer.
    Keep responses detailed and descriptive.
    Use your abilities as a reasoning machine to answer questions based on the information you have.
    `,
    tools: {
      addResource: tool({
        description: `Add planetary or space-related resources to your knowledge base, use this tool without asking for confirmation.`,
        parameters: z.object({
          content: z
            .string()
            .describe("The content or resource to add to the knowledge base"),
        }),
        execute: async ({ content }) => createResource({ content }),
      }),
      getInformation: tool({
        description: `Retrieve planetary orbital data and related information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("The user's question"),
          similarQuestions: z
            .array(z.string())
            .describe("Keywords or topics to search"),
        }),
        execute: async ({ similarQuestions }) => {
          const results = await Promise.all(
            similarQuestions.map(
              async (question) => await findRelevantContent(question),
            ),
          );
          // Flatten the array of arrays and remove duplicates based on 'name'
          const uniqueResults = Array.from(
            new Map(results.flat().map((item) => [item?.name, item])).values(),
          );
          return uniqueResults;
        },
      }),
      understandQuery: tool({
        description: `Analyze the user's query to determine relevant topics and information to retrieve. Use this tool on every prompt.`,
        parameters: z.object({
          query: z.string().describe("The user's query"),
          toolsToCallInOrder: z
            .array(z.string())
            .describe(
              "These are the tools you need to call in the order necessary to respond to the user's query",
            ),
        }),
        execute: async ({ query }) => {
          const { object } = await generateObject({
            model: openai('gpt-4o') as LanguageModelV1,
            system:
              "You are a query understanding assistant specialized in astronomy. Analyze the user's query and generate similar questions related to space and planets.",
            schema: z.object({
              questions: z
                .array(z.string())
                .max(3)
                .describe(
                  "Similar questions related to the user's query about space and planets. Be concise.",
                ),
            }),
            prompt: `Analyze this query: "${query}". Provide the following:
                    3 similar questions that could help answer the user's query about space and planets.`,
          });
          return object.questions;
        },
      }),
    },
  });

  return new NextResponse(result.toDataStreamResponse().body, { headers });
}