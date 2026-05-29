import { NextResponse } from "next/server";
import { appendOrderToSheet, createOrderRecord, sendOrderEmails } from "@/lib/order-service";
import { orderSchema } from "@/lib/order-schema";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = orderSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the highlighted fields and try again.",
          errors: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const order = createOrderRecord(parsed.data);

    await appendOrderToSheet(order);
    await sendOrderEmails(order);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Order submission failed.";
    console.error("Order submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message
      },
      { status: 500 }
    );
  }
}
