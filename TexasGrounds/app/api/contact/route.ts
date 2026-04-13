import { NextResponse } from "next/server";

type ContactPayload = {
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  specialRequests?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const email = (body.email ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const service = (body.service ?? "").trim();
    const message = (body.message ?? "").trim();
    const specialRequests = (body.specialRequests ?? "").trim();

    if (!email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields before submitting." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length < 12) {
      return NextResponse.json(
        { error: "Please provide a little more detail in your message." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      received: {
        email,
        phone,
        service,
        message,
        specialRequests,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process the request right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
