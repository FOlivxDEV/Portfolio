import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0),
  consent: z.literal(true),
});
const attempts = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const now = Date.now();
    const current = attempts.get(ip);
    if (current && current.reset > now && current.count >= 4) {
      return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
    }
    attempts.set(ip, current && current.reset > now ? { ...current, count: current.count + 1 } : { count: 1, reset: now + 10 * 60_000 });
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Revise os campos e tente novamente." }, { status: 400 });

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Canal de contato em configuração." }, { status: 503 });
      return NextResponse.json({ ok: true, preview: true });
    }
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name, email: parsed.data.email, company: parsed.data.company || null,
      message: parsed.data.message, consent_version: "1.0",
    });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Não foi possível enviar agora. Tente novamente mais tarde." }, { status: 500 });
  }
}
