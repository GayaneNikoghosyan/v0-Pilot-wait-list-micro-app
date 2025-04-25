import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, company } = body;

  const publicDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  const emailDomain = email.split("@")[1];
  if (publicDomains.includes(emailDomain)) {
    return NextResponse.json({ error: "Please use a work email." }, { status: 400 });
  }

  const { data, error } = await supabase.from("waitlist").insert([
    {
      name,
      email,
      company,
      submitted_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const enrich = await fetchClaude(company);
  if (enrich) {
    await supabase
      .from("waitlist")
      .update({
        ai_description: enrich.description,
        ai_leadscore: enrich.score,
      })
      .eq("email", email);
  }

  await sendToSlack({ name, email, company, ...enrich });

  return NextResponse.json({ success: true });
}

async function fetchClaude(company: string) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLAUDE_API_KEY!,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 200,
        temperature: 0.3,
        messages: [
          {
            role: "user",
            content: `Give a short (max 40-word) description of the company "${company}" and assign a lead score from 1–5 based on:\n
- Is it a B2B SaaS?\n- Company size\n- Demo friction (e.g. is a "Book Demo" button visible?)\n
Respond only in JSON like this: { "description": "...", "score": 1–5 }`,
          },
        ],
      }),
    });

    const body = await res.json();
    const content = body?.content?.[0]?.text || "{}";
    return JSON.parse(content);
  } catch {
    return { description: "No public info found", score: 1 };
  }
}

async function sendToSlack({ name, email, company, description, score }: any) {
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `📥 *New Waitlist Submission*:\n
👤 *${name}* (${email})\n
🏢 *${company}*\n
💬 "${description}"\n
⭐️ Lead Score: *${score}*`,
    }),
  });
}
