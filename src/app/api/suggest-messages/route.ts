import OpenAI from 'openai'; // Import at top (no require)
import { OpenAIStream, StreamingTextResponse } from 'ai'; // For streaming (optional)
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Add this if using edge runtime

export async function POST(req: Request) {
  console.log('API Route Called - GROK_API_KEY exists:', !!process.env.GROK_API_KEY); // Debug log

  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Try Official Grok API first
    if (process.env.GROK_API_KEY) {
      try {
        const grok = new OpenAI({
          apiKey: process.env.GROK_API_KEY,
          baseURL: 'https://api.x.ai/v1',
        });

        const response = await grok.chat.completions.create({
          model: 'grok-beta',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 400,
          // stream: true, // Uncomment for streaming
        });

        // If streaming: const stream = OpenAIStream(response); return new StreamingTextResponse(stream);

        console.log('Grok Success!'); // Debug log
        return NextResponse.json({
          success: true,
          questions: response.choices[0].message.content,
          source: 'grok-official'
        });
      } catch (grokError) {
        console.error('Grok API failed:', grokError); // Detailed error log
        // Don't return here; continue to fallback
      }
    } else {
      console.log('Skipping Grok: No API key set'); // Debug log
    }

    // Secondary Fallback: Try Hugging Face (free alternative, add HUGGINGFACE_API_KEY to .env)
    if (process.env.HUGGINGFACE_API_KEY) {
      try {
        const hfResponse = await fetch(
          'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B', // Free model
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ inputs: prompt, parameters: { max_length: 400 } }),
          }
        );

        if (hfResponse.ok) {
          const data = await hfResponse.json();
          console.log('Hugging Face Success!'); // Debug log
          return NextResponse.json({
            success: true,
            questions: data[0].generated_text.split('\n')[0], // Basic parsing; adjust as needed
            source: 'huggingface'
          });
        }
      } catch (hfError) {
        console.error('Hugging Face failed:', hfError); // Detailed error log
      }
    }

    // Final Fallback: Mock questions
    console.log('Using mock fallback'); // Debug log
    const mockQuestions = [
      "What's the most interesting book you've read recently?||If you could learn any new skill instantly, what would it be?||What's your favorite way to spend a weekend?",
      "What's a random act of kindness you witnessed recently?||If you could visit any place in the world, where would you go?||What's something that always makes you smile?",
      "What's the best advice you've ever received?||If you could have any superpower for a day, what would it be?||What's your favorite childhood memory?",
    ];

    const randomQuestions = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];

    return NextResponse.json({
      success: true,
      questions: randomQuestions,
      source: 'fallback'
    });

  } catch (error) {
    console.error('Unexpected error:', error); // Catch-all log
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
