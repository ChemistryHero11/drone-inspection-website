import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      company,
      email,
      location,
      details,
      projectType,
      timeframe,
      budgetRange,
    } = body;

    if (!email || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const to = 'nich_in_uscg@hotmail.com';
    const subject = 'New mission request from SkyHigh Imaging website';

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827;">
        <h2>New Mission Request</h2>
        <p><strong>Company:</strong> ${company || '-'}</p>
        <p><strong>Contact Email:</strong> ${email || '-'}</p>
        <p><strong>Site Coordinates / Location:</strong> ${location || '-'}</p>
        <p><strong>Project Type:</strong> ${projectType || '-'}</p>
        <p><strong>Budget Range:</strong> ${budgetRange || '-'}</p>
        <p><strong>Timeframe:</strong> ${timeframe || '-'}</p>
        <p><strong>Mission Brief:</strong></p>
        <p>${(details || '').replace(/\n/g, '<br />')}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: 'SkyHigh Imaging <onboarding@resend.dev>',
      to,
      reply_to: email,
      subject,
      html,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Unexpected error' },
      { status: 500 },
    );
  }
}
