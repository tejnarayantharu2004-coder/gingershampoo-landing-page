# Ginger Shampoo COD Sales Funnel

Complete Cash On Delivery funnel for Kesh Care Nepal built with Next.js App Router, Tailwind CSS, Google Sheets, and SMTP email notifications.

## Order Flow

1. Customer clicks a landing page CTA.
2. Product name, quantity, price per piece, and total price are passed to `/checkout`.
3. Checkout posts validated customer/order details to `POST /api/order`.
4. The API generates an Order ID, adds date/time, payment method, and `New Order` status.
5. The order is saved to Google Sheets.
6. A professional HTML order notification email is sent to the business Gmail.
7. A customer order received HTML email is sent to the customer.
8. The customer is redirected to `/thank-you`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill the values:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BUSINESS_EMAIL=digitaltejnarayan@gmail.com
EMAIL_FROM=digitaltejnarayan@gmail.com
BRAND_NAME=Kesh Care Nepal

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=Orders
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=

EMAIL_SERVICE_API_KEY=

FRONTEND_URL=http://localhost:3000
```

For Gmail SMTP, use an app password in `SMTP_PASS`, not your normal Gmail password.

## Google Spreadsheet Setup

1. Create a Google Spreadsheet.
2. Create a sheet/tab, for example `Orders`.
3. Add these exact headers in row 1:

```text
Order ID | Date & Time | Customer Name | Phone Number | Email Address | Exact Location | Product Name | Quantity | Price Per Piece | Total Price | Payment Method | Order Status | Notes
```

4. Select the header row and choose **Data > Create a filter**.
5. Select the `Order Status` column, choose **Data > Data validation**, and add dropdown options:

```text
New Order
Order Confirmed
Order Ongoing
Delivered
Cancelled
```

6. Get the Sheet ID from the URL:

```text
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

7. Create a Google Cloud service account, enable the Google Sheets API, and generate a JSON key.
8. Put `client_email` into `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
9. Put `private_key` into `GOOGLE_PRIVATE_KEY`. Keep the `\n` characters if adding it as one line.
10. Share the Google Sheet with the service account email as Editor.

## How To Test Order Submission

1. Install dependencies:

```bash
npm install
```

2. Add `.env.local` with valid Google and SMTP credentials.
3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`.
5. Place a test order from checkout.
6. Confirm that:

- A new row appears in Google Sheets.
- `digitaltejnarayan@gmail.com` receives the business notification.
- The customer email receives the order confirmation.
- The browser redirects to `/thank-you`.

If submission fails, the checkout page shows the API error and does not redirect.

## Deploy On Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add all environment variables from `.env.example` in the Vercel project settings.
4. Set `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to your production domain.
5. Deploy.

The API route `/api/order` runs server-side on Vercel and does not expose Google or email credentials to the frontend.
