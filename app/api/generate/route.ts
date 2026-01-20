import { NextRequest, NextResponse } from "next/server";

// Helper function to parse JSON response from AI
function parseAIResponse(content: string) {
  // First, try to clean the content
  let cleanedContent = content.trim();
  
  // Remove markdown code blocks if present
  cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
  
  // Try to extract JSON if wrapped in other text
  const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
  if (jsonMatch && jsonMatch[0]) {
    cleanedContent = jsonMatch[0];
  }
  
  let parsedContent;
  try {
    parsedContent = JSON.parse(cleanedContent);
  } catch (e) {
    console.error("JSON parsing error:", e);
    
    // Try to manually extract summary and takeaways with better regex
    // Handle multiline strings and escaped quotes
    const summaryMatch = cleanedContent.match(/"summary"\s*:\s*"((?:[^"\\]|\\.|\\n)*?)"/);
    
    // For takeaways, extract the array content more carefully
    const takeawaysArrayMatch = cleanedContent.match(/"takeaways"\s*:\s*\[([\s\S]*?)\](?=\s*[,}])/);
    
    let extractedSummary = '';
    let extractedTakeaways: string[] = [];
    
    if (summaryMatch) {
      // Unescape the summary
      extractedSummary = summaryMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\');
    }
    
    if (takeawaysArrayMatch) {
      const arrayContent = takeawaysArrayMatch[1];
      // Split by comma, but respect quoted strings
      const items: string[] = [];
      let currentItem = '';
      let inQuotes = false;
      let escapeNext = false;
      
      for (let i = 0; i < arrayContent.length; i++) {
        const char = arrayContent[i];
        
        if (escapeNext) {
          currentItem += char;
          escapeNext = false;
          continue;
        }
        
        if (char === '\\') {
          escapeNext = true;
          currentItem += char;
          continue;
        }
        
        if (char === '"') {
          inQuotes = !inQuotes;
          currentItem += char;
          continue;
        }
        
        if (char === ',' && !inQuotes) {
          // End of item
          const cleaned = currentItem.trim().replace(/^["']|["']$/g, '');
          if (cleaned) {
            items.push(cleaned.replace(/\\n/g, '\n').replace(/\\"/g, '"'));
          }
          currentItem = '';
          continue;
        }
        
        currentItem += char;
      }
      
      // Add last item
      if (currentItem.trim()) {
        const cleaned = currentItem.trim().replace(/^["']|["']$/g, '');
        if (cleaned) {
          items.push(cleaned.replace(/\\n/g, '\n').replace(/\\"/g, '"'));
        }
      }
      
      extractedTakeaways = items.filter(item => item.length > 0);
    }
    
    if (extractedSummary || extractedTakeaways.length > 0) {
      parsedContent = {
        summary: extractedSummary || 'Summary could not be extracted properly.',
        takeaways: extractedTakeaways.length > 0 ? extractedTakeaways : [],
      };
    } else {
      // Last resort: try to find any text between quotes as summary
      const anyQuoteMatch = cleanedContent.match(/"summary"\s*:\s*"([\s\S]{0,500})/);
      parsedContent = {
        summary: anyQuoteMatch ? anyQuoteMatch[1] + '...' : cleanedContent.substring(0, 500),
        takeaways: [],
      };
    }
  }
  
  // Ensure takeaways is an array and filter out placeholder-like text
  if (!Array.isArray(parsedContent.takeaways)) {
    if (typeof parsedContent.takeaways === 'string') {
      parsedContent.takeaways = parsedContent.takeaways
        .split('\n')
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0 && !t.match(/^(takeaway|insight|principle)\s*\d+/i));
    } else {
      parsedContent.takeaways = [];
    }
  }
  
  // Filter out placeholder-like takeaways
  parsedContent.takeaways = parsedContent.takeaways.filter((t: string) => {
    const lower = t.toLowerCase();
    return !lower.includes('placeholder') && 
           !lower.includes('configure') && 
           !lower.includes('api key') &&
           t.length > 20; // Ensure meaningful length
  });
  
  // If no valid takeaways, provide meaningful defaults
  if (parsedContent.takeaways.length === 0) {
    parsedContent.takeaways = [
      "Reflect on how the themes in this chapter apply to your daily life.",
      "Consider practical ways to integrate these biblical principles into your relationships and decisions.",
      "Take time to meditate on the spiritual lessons and how they can transform your perspective.",
    ];
  }
  
  return parsedContent;
}

// Generate prompt for AI
function generatePrompt(book: string, chapter: number, bibleText: string) {
  return `You are a biblical scholar providing concise, well-organized summaries of Bible chapters.

TASK: Analyze ${book} Chapter ${chapter} (King James Version) and provide:

1. SUMMARY (2-3 brief paragraphs):
   - Organize by main themes or sections
   - Highlight key events, teachings, or spiritual principles
   - Use clear, flowing prose (not bullet points)
   - Keep it concise but comprehensive

2. PRACTICAL TAKEAWAYS (3-5 items):
   - Each takeaway must be ONE concise sentence (one-liner)
   - Make it actionable and directly applicable to daily life
   - Keep it brief, specific, and practical
   - Avoid multiple sentences or lengthy explanations

REQUIREMENTS:
- Remain faithful to Scripture's intended meaning
- Use accessible, modern language
- Focus on practical application
- Avoid theological speculation

Bible Text:
${bibleText}

IMPORTANT: Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, no extra text):
{
  "summary": "Your well-organized 2-3 paragraph summary here...",
  "takeaways": [
    "First complete, actionable takeaway sentence.",
    "Second complete, actionable takeaway sentence.",
    "Third complete, actionable takeaway sentence."
  ]
}`;
}

// Try OpenAI API
async function tryOpenAI(book: string, chapter: number, bibleText: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { success: false, error: "OpenAI API key not configured" };
  }

  try {
    const prompt = generatePrompt(book, chapter, bibleText);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using cheaper model, can change to gpt-4o if needed
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that provides biblical insights in JSON format.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return { success: false, error: `OpenAI API error: ${errorText}` };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    if (!content) {
      return { success: false, error: "No content received from OpenAI" };
    }

    const parsedContent = parseAIResponse(content);
    return {
      success: true,
      data: {
        summary: parsedContent.summary || content,
        takeaways: Array.isArray(parsedContent.takeaways)
          ? parsedContent.takeaways
          : parsedContent.takeaways?.split("\n").filter((t: string) => t.trim()) || [],
        reference: `${book} ${chapter} (KJV)`,
      },
    };
  } catch (error) {
    console.error("OpenAI request failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Try Google Gemini API
async function tryGemini(book: string, chapter: number, bibleText: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return { success: false, error: "Google API key not configured" };
  }

  try {
    const prompt = generatePrompt(book, chapter, bibleText);
    
    // Try different models and API versions
    // Format: { model, apiVersion, endpoint, supportsJsonMimeType }
    // Only using gemini-3-flash-preview as specified by user
    const modelConfigs = [
      { model: "gemini-3-flash-preview", apiVersion: "v1beta", endpoint: "v1beta", supportsJsonMimeType: true },
    ];
    
    let lastError: string | null = null;

    for (const config of modelConfigs) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/${config.endpoint}/models/${config.model}:generateContent?key=${apiKey}`;
        
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful assistant that provides biblical insights in JSON format. ${prompt}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2000,
              // Only add responseMimeType for models that support it
              ...(config.supportsJsonMimeType ? { responseMimeType: "application/json" } : {}),
            },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          lastError = errorText;
          
          // If model not found, try next model
          if (response.status === 404) {
            console.log(`Model ${config.model} (${config.endpoint}) not found, trying next...`);
            lastError = errorText;
            continue;
          }
          
          // For other errors, log but continue to next
          console.error(`Gemini API error (${config.model}):`, errorText);
          lastError = errorText;
          continue;
        }

        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        
        if (!content) {
          lastError = "No content received from Gemini";
          continue;
        }

        const parsedContent = parseAIResponse(content);
        return {
          success: true,
          data: {
            summary: parsedContent.summary || content,
            takeaways: Array.isArray(parsedContent.takeaways)
              ? parsedContent.takeaways
              : parsedContent.takeaways?.split("\n").filter((t: string) => t.trim()) || [],
            reference: `${book} ${chapter} (KJV)`,
          },
        };
      } catch (error) {
        lastError = error instanceof Error ? error.message : "Unknown error";
        console.error(`Gemini request failed for ${config.model}:`, error);
        // Continue to next model
        continue;
      }
    }

    // If all models failed
    return { success: false, error: lastError || "All Gemini models failed" };
  } catch (error) {
    console.error("Gemini request failed:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { book, chapter } = await request.json();

    if (!book || !chapter) {
      return NextResponse.json(
        { error: "Book and chapter are required" },
        { status: 400 }
      );
    }

    // TODO: Fetch actual Bible text from KJV source
    // For now, using a placeholder - you'll need to integrate a Bible text API
    const bibleText = `[Bible text for ${book} Chapter ${chapter} would be fetched here]`;

    // Try OpenAI first
    console.log("Attempting OpenAI...");
    const openAIResult = await tryOpenAI(book, chapter, bibleText);
    
    if (openAIResult.success) {
      return NextResponse.json(openAIResult.data);
    }

    console.log("OpenAI failed, trying Gemini...", openAIResult.error);

    // Fallback to Gemini
    const geminiResult = await tryGemini(book, chapter, bibleText);
    
    if (geminiResult.success) {
      return NextResponse.json(geminiResult.data);
    }

    console.log("Gemini also failed:", geminiResult.error);

    // If both fail, return error
    return NextResponse.json(
      {
        error: "Failed to generate summary. Both OpenAI and Gemini APIs are unavailable or misconfigured.",
        details: {
          openai: openAIResult.error,
          gemini: geminiResult.error,
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
