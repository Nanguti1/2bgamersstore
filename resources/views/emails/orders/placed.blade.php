<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order #{{ $order->id }}</title>
</head>
<body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
    <div style="background:linear-gradient(120deg,#1d4ed8,#4f46e5);padding:24px;color:#ffffff;">
        <p style="margin:0 0 8px 0;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;opacity:.9;">2B Gamers Store</p>
        <h1 style="margin:0;font-size:22px;">New Order Received</h1>
        <p style="margin:10px 0 0 0;font-size:14px;opacity:.95;">Order #{{ $order->id }} • {{ now()->format('M d, Y h:i A') }}</p>
    </div>

    <div style="padding:24px;">
        <h2 style="margin:0 0 8px 0;font-size:18px;">Hi Grace,</h2>
        <p style="margin:0 0 18px 0;line-height:1.55;color:#374151;">A new order has been placed by <strong>{{ $customerName }}</strong>. Here are the details.</p>

        <div style="border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin-bottom:18px;background:#f9fafb;">
            <p style="margin:0 0 8px 0;"><strong>Customer Email:</strong> {{ $order->email }}</p>
            <p style="margin:0 0 8px 0;"><strong>Phone:</strong> {{ $order->phone }}</p>
            <p style="margin:0 0 8px 0;"><strong>Order Status:</strong> <span style="color:#1d4ed8;font-weight:700;">{{ ucfirst($order->status->value) }}</span></p>
            <p style="margin:0;"><strong>Payment Status:</strong> <span style="color:#7c3aed;font-weight:700;">{{ ucfirst($order->payment_status->value) }}</span></p>
        </div>

        <h3 style="margin:0 0 12px 0;font-size:16px;">Items</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <thead>
            <tr style="background:#f3f4f6;">
                <th style="padding:10px;border:1px solid #e5e7eb;text-align:left;">Product</th>
                <th style="padding:10px;border:1px solid #e5e7eb;text-align:center;">Qty</th>
                <th style="padding:10px;border:1px solid #e5e7eb;text-align:right;">Amount</th>
            </tr>
            </thead>
            <tbody>
            @foreach($items as $item)
                <tr>
                    <td style="padding:10px;border:1px solid #e5e7eb;">{{ $item->product?->name ?? 'Product #'.$item->product_id }}</td>
                    <td style="padding:10px;border:1px solid #e5e7eb;text-align:center;">{{ $item->quantity }}</td>
                    <td style="padding:10px;border:1px solid #e5e7eb;text-align:right;">KES {{ number_format($item->line_total, 2) }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>

        <div style="margin-top:18px;border-top:1px solid #e5e7eb;padding-top:14px;">
            <p style="margin:0 0 6px 0;"><strong>Subtotal:</strong> KES {{ number_format($order->total_amount, 2) }}</p>
            <p style="margin:0 0 6px 0;"><strong>Shipping:</strong> KES {{ number_format($order->shipping_amount, 2) }}</p>
            <p style="margin:0 0 6px 0;"><strong>Tax:</strong> KES {{ number_format($order->tax_amount, 2) }}</p>
            <p style="margin:0;font-size:18px;"><strong>Total:</strong> KES {{ number_format($order->total_amount + $order->shipping_amount + $order->tax_amount, 2) }}</p>
        </div>
    </div>
</div>
</body>
</html>
