import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/site-config";
import fs from "fs";
import path from "path";

interface BookingRequest {
  name: string;
  email: string;
  message?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  locale: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.checkIn || !body.checkOut) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const total = body.nights * siteConfig.pricePerNight;

    // Try Resend email first
    if (process.env.RESEND_API_KEY && process.env.BOOKING_EMAIL) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Gudauri Booking <onboarding@resend.dev>",
          to: process.env.BOOKING_EMAIL,
          subject: `Booking Request: ${body.checkIn} → ${body.checkOut} (${body.name})`,
          html: `
            <h2>New Booking Request</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px;">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Guest</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.name}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Check-in</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.checkIn}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Check-out</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.checkOut}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Nights</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.nights}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Guests</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.guests}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Total</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">$${total}</td></tr>
              ${body.message ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.message}</td></tr>` : ""}
            </table>
            <p style="margin-top:16px;color:#888;font-size:13px;">Locale: ${body.locale} | Sent via gudauri-apartment</p>
          `,
        });

        return NextResponse.json({ success: true, method: "email" });
      } catch (emailError) {
        console.error("Email send failed, falling back to file:", emailError);
      }
    }

    // Fallback: save to local JSON file (dev mode)
    const requestsDir = path.join(process.cwd(), "booking-requests");
    if (!fs.existsSync(requestsDir)) {
      fs.mkdirSync(requestsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `booking-${timestamp}.json`;
    const filepath = path.join(requestsDir, filename);

    fs.writeFileSync(
      filepath,
      JSON.stringify(
        {
          ...body,
          total,
          currency: siteConfig.currency,
          receivedAt: new Date().toISOString(),
        },
        null,
        2
      )
    );

    console.log(`Booking request saved to ${filepath}`);
    return NextResponse.json({ success: true, method: "file" });
  } catch (error) {
    console.error("Booking request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
