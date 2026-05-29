import nodemailer from "nodemailer";
import { google } from "googleapis";
import { OrderInput } from "./order-schema";

export type OrderRecord = OrderInput & {
  orderId: string;
  dateTime: string;
  paymentMethod: "Cash On Delivery";
  orderStatus: "New Order";
  notes: "";
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function money(value: number) {
  return `Rs ${value.toLocaleString("en-NP")}`;
}

export function createOrderRecord(input: OrderInput): OrderRecord {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();

  return {
    ...input,
    orderId: `KCN-${stamp}-${random}`,
    dateTime: new Intl.DateTimeFormat("en-NP", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kathmandu"
    }).format(new Date()),
    paymentMethod: "Cash On Delivery",
    orderStatus: "New Order",
    notes: ""
  };
}

export async function appendOrderToSheet(order: OrderRecord) {
  const sheetId = requireEnv("GOOGLE_SHEET_ID");
  const clientEmail = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || "Orders";

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!A:M`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          order.orderId,
          order.dateTime,
          order.fullName,
          order.phone,
          order.email,
          order.location,
          order.productName,
          order.quantity,
          order.pricePerPiece,
          order.totalPrice,
          order.paymentMethod,
          order.orderStatus,
          order.notes
        ]
      ]
    }
  });
}

function emailShell(preheader: string, body: string) {
  const brandName = process.env.BRAND_NAME || "Kesh Care Nepal";

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f4f8f1;font-family:Arial,Helvetica,sans-serif;color:#1f2421;">
    <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f8f1;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #dcebd5;">
            <tr>
              <td style="background:#006f32;color:#ffffff;padding:26px 28px;">
                <div style="font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#c9f2bd;">${brandName}</div>
                <div style="font-size:28px;font-weight:700;line-height:1.2;margin-top:8px;">${preheader}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailTable(rows: Array<[string, string]>) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:14px 0 22px;">
    ${rows
      .map(
        ([label, value]) => `<tr>
          <td style="padding:11px 0;border-bottom:1px solid #edf2ea;color:#5f675f;font-size:14px;">${label}</td>
          <td align="right" style="padding:11px 0;border-bottom:1px solid #edf2ea;color:#1f2421;font-size:14px;font-weight:700;">${value}</td>
        </tr>`
      )
      .join("")}
  </table>`;
}

export function businessEmailHtml(order: OrderRecord) {
  return emailShell(
    "New product order received",
    `
      <p style="font-size:16px;line-height:1.6;margin:0 0 18px;">A new Cash On Delivery order has been placed. Please call the customer soon to confirm this order.</p>
      <div style="display:inline-block;background:#e8f7df;color:#236d16;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:700;margin-bottom:18px;">${order.orderStatus}</div>
      ${detailTable([
        ["Order ID", order.orderId],
        ["Date & Time", order.dateTime],
        ["Customer Name", order.fullName],
        ["Phone Number", order.phone],
        ["Email Address", order.email],
        ["Exact Location", order.location],
        ["Product Name", order.productName],
        ["Quantity", String(order.quantity)],
        ["Price Per Piece", money(order.pricePerPiece)],
        ["Total Price", money(order.totalPrice)],
        ["Payment Method", order.paymentMethod]
      ])}
      <div style="background:#fff8e8;border:1px solid #efd399;border-radius:14px;padding:16px;color:#5c4214;font-weight:700;">Please call the customer soon to confirm this order.</div>
    `
  );
}

export function customerEmailHtml(order: OrderRecord) {
  const brandName = process.env.BRAND_NAME || "Kesh Care Nepal";
  const replyEmail = process.env.EMAIL_FROM || process.env.BUSINESS_EMAIL || "";

  return emailShell(
    "Your order has been received",
    `
      <p style="font-size:16px;line-height:1.7;margin:0 0 18px;">Hi ${order.fullName},</p>
      <p style="font-size:16px;line-height:1.7;margin:0 0 18px;">Thank you for your order. We have received your order successfully.</p>
      ${detailTable([
        ["Order ID", order.orderId],
        ["Product", order.productName],
        ["Quantity", String(order.quantity)],
        ["Total Price", money(order.totalPrice)],
        ["Payment Method", order.paymentMethod]
      ])}
      <div style="background:#e8f7df;border:1px solid #bfe6aa;border-radius:14px;padding:16px;color:#236d16;font-weight:700;margin-bottom:20px;">Our sales representative will call you soon to confirm your order.</div>
      <p style="font-size:15px;line-height:1.7;margin:0;">For support, reply to this email${replyEmail ? ` or contact ${replyEmail}` : ""}.</p>
      <p style="font-size:15px;line-height:1.7;margin:18px 0 0;">Thank you,<br />${brandName}</p>
    `
  );
}

export async function sendOrderEmails(order: OrderRecord) {
  const host = requireEnv("SMTP_HOST");
  const port = Number(requireEnv("SMTP_PORT"));
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const businessEmail = requireEnv("BUSINESS_EMAIL");
  const from = process.env.EMAIL_FROM || user;
  const brandName = process.env.BRAND_NAME || "Kesh Care Nepal";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from: `"${brandName}" <${from}>`,
    to: businessEmail,
    replyTo: order.email,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessEmailHtml(order)
  });

  await transporter.sendMail({
    from: `"${brandName}" <${from}>`,
    to: order.email,
    replyTo: from,
    subject: `Your Order Has Been Received - ${brandName}`,
    html: customerEmailHtml(order)
  });
}
