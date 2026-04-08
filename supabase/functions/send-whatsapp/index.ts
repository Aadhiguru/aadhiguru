import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER"); // e.g. "whatsapp:+14155238886"
const ADMIN_PHONE_NUMBER = Deno.env.get("ADMIN_PHONE_NUMBER"); // e.g. "whatsapp:+919600666225"
const SITE_URL = Deno.env.get("SITE_URL") || "https://yourdomain.com";

// @ts-ignore - Supabase Edge Functions environment
serve(async (req: any) => {
  try {
    const payload = await req.json();
    console.log("Webhook payload:", payload);

    if (payload.type === "INSERT" && payload.table === "bookings") {
      const record = payload.record;
      const messageBody = `*New Booking Request:*
Name: ${record.full_name}
Phone: ${record.phone_number}
Gender: ${record.gender}
Service: ${record.purpose_of_booking}
Date: ${record.date}
Time: ${record.time_slot}
Location: ${record.meeting_location}

Accept: ${SITE_URL}/accept?id=${record.id}
Reject: ${SITE_URL}/reject?id=${record.id}`;

      await sendTwilioMessage(ADMIN_PHONE_NUMBER, messageBody);
      return new Response(JSON.stringify({ success: true, message: "Admin notified" }), { headers: { "Content-Type": "application/json" } });
    }
    
    // Check if it's an UPDATE for status
    if (payload.type === "UPDATE" && payload.table === "bookings") {
      const oldRecord = payload.old_record;
      const newRecord = payload.record;
      
      if (oldRecord.status === "pending" && newRecord.status === "accepted") {
        const userPhone = formatPhone(newRecord.phone_number);
        const msg = `*AadhiGuru*: Hello ${newRecord.full_name}, your booking for ${newRecord.purpose_of_booking} on ${newRecord.date} has been accepted! Please visit ${SITE_URL}/pay?id=${newRecord.id} to securely complete your payment.`;
        await sendTwilioMessage(userPhone, msg);
      } else if (oldRecord.status === "pending" && newRecord.status === "rejected") {
        const userPhone = formatPhone(newRecord.phone_number);
        const msg = `*AadhiGuru*: Hello ${newRecord.full_name}, sorry to inform you that your booking request for ${newRecord.purpose_of_booking} on ${newRecord.date} cannot be accommodated at this time. Please contact us for alternate slots.`;
        await sendTwilioMessage(userPhone, msg);
      }
      return new Response(JSON.stringify({ success: true, message: "Status handled" }), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true, message: "Ignored" }), { headers: { "Content-Type": "application/json" } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});

function formatPhone(phone: string) {
  const p = phone.replace(/[^0-9]/g, '');
  if (p.length === 10) return `whatsapp:+91${p}`;
  return `whatsapp:+${p}`;
}

async function sendTwilioMessage(to: string, body: string) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.error("Twilio credentials missing!");
    return;
  }
  
  const token = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
  
  const formData = new URLSearchParams();
  formData.append("To", to);
  formData.append("From", TWILIO_PHONE_NUMBER!);
  formData.append("Body", body);

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData.toString()
  });
  
  if (!res.ok) {
    const err = await res.text();
    console.error("Twilio Error:", err);
  } else {
    console.log("Message sent to", to);
  }
}
