import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: "security_alert" | "booking_confirmation" | "booking_cancellation" | "password_reset" | "welcome";
  to: string;
  data: Record<string, any>;
}

const getEmailTemplate = (type: string, data: Record<string, any>) => {
  switch (type) {
    case "security_alert":
      return {
        subject: `🔒 Security Alert: ${data.alertType}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">🚨 Security Alert</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6;">
                We detected ${data.alertType} on your Parq account.
              </p>
              <div style="background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #64748b;"><strong>Time:</strong> ${data.timestamp}</p>
                <p style="margin: 8px 0 0; color: #64748b;"><strong>IP Address:</strong> ${data.ipAddress || 'Unknown'}</p>
                <p style="margin: 8px 0 0; color: #64748b;"><strong>Location:</strong> ${data.location || 'Unknown'}</p>
                ${data.device ? `<p style="margin: 8px 0 0; color: #64748b;"><strong>Device:</strong> ${data.device}</p>` : ''}
              </div>
              <p style="color: #334155; font-size: 14px;">
                If this was you, you can ignore this email. If you didn't perform this action, please secure your account immediately.
              </p>
            </div>
          </div>
        `,
      };

    case "booking_confirmation":
      return {
        subject: `✅ Booking Confirmed - ${data.parkingSpotName}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">🅿️ Booking Confirmed!</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6;">
                Great news! Your parking spot has been booked successfully.
              </p>
              <div style="background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 16px; color: #1a1a2e;">${data.parkingSpotName}</h3>
                <p style="margin: 0; color: #64748b;"><strong>📍 Address:</strong> ${data.address}</p>
                <p style="margin: 8px 0 0; color: #64748b;"><strong>📅 Date:</strong> ${data.date}</p>
                <p style="margin: 8px 0 0; color: #64748b;"><strong>⏰ Time:</strong> ${data.startTime} - ${data.endTime}</p>
                <p style="margin: 8px 0 0; color: #64748b;"><strong>🚗 Vehicle:</strong> ${data.vehicleNumber}</p>
                <p style="margin: 16px 0 0; color: #1a1a2e; font-size: 20px;"><strong>Total: ₹${data.totalAmount}</strong></p>
              </div>
              <p style="color: #64748b; font-size: 14px;">
                Booking ID: <strong>${data.bookingId}</strong>
              </p>
            </div>
          </div>
        `,
      };

    case "booking_cancellation":
      return {
        subject: `❌ Booking Cancelled - ${data.parkingSpotName}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ef4444; margin: 0; font-size: 24px;">Booking Cancelled</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6;">
                Your booking has been cancelled.
              </p>
              <div style="background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 16px; color: #1a1a2e;">${data.parkingSpotName}</h3>
                <p style="margin: 0; color: #64748b;"><strong>Booking ID:</strong> ${data.bookingId}</p>
                ${data.refundAmount ? `<p style="margin: 8px 0 0; color: #22c55e;"><strong>Refund Amount:</strong> ₹${data.refundAmount}</p>` : ''}
                ${data.reason ? `<p style="margin: 8px 0 0; color: #64748b;"><strong>Reason:</strong> ${data.reason}</p>` : ''}
              </div>
            </div>
          </div>
        `,
      };

    case "password_reset":
      return {
        subject: "🔑 Reset Your Parq Password",
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">Reset Your Password</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password. Click the button below to create a new password.
              </p>
              <a href="${data.resetLink}" style="display: inline-block; background: #fbbf24; color: #1a1a2e; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0;">
                Reset Password
              </a>
              <p style="color: #64748b; font-size: 14px;">
                This link will expire in 1 hour. If you didn't request this, please ignore this email.
              </p>
            </div>
          </div>
        `,
      };

    case "welcome":
      return {
        subject: "🎉 Welcome to Parq - Smart Parking Made Easy!",
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #fbbf24; margin: 0; font-size: 24px;">Welcome to Parq! 🅿️</h1>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6;">
                Hi ${data.name || 'there'}! 👋
              </p>
              <p style="color: #334155; font-size: 16px; line-height: 1.6;">
                Welcome to Parq - your smart parking companion. We're excited to have you on board!
              </p>
              <div style="background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 12px; color: #1a1a2e;">What you can do with Parq:</h3>
                <ul style="color: #64748b; padding-left: 20px;">
                  <li>Find and book parking spots instantly</li>
                  <li>Access EV charging stations</li>
                  <li>Add value-added services like car wash</li>
                  <li>Track all your bookings in one place</li>
                </ul>
              </div>
            </div>
          </div>
        `,
      };

    default:
      return {
        subject: "Notification from Parq",
        html: `<p>${data.message || 'You have a new notification.'}</p>`,
      };
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, to, data }: EmailRequest = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log(`Sending ${type} email to ${to}`);

    const template = getEmailTemplate(type, data);

    // Send email using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Parq <notifications@resend.dev>",
        to: [to],
        subject: template.subject,
        html: template.html,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      throw new Error(emailResult.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailResult);

    // Log security alerts to database
    if (type === "security_alert" && data.userId) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      await supabase.from("security_alerts").insert({
        user_id: data.userId,
        alert_type: data.alertType,
        severity: data.severity || "info",
        message: data.message || `Security alert: ${data.alertType}`,
        ip_address: data.ipAddress,
        user_agent: data.userAgent,
        location: data.location,
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify({ success: true, ...emailResult }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
