# Mpesa Payment Integration

This document explains how to configure and use the Mpesa payment integration in the 2B Gamers Store application.

## Overview

The integration includes two Mpesa APIs:

1. **STK Push (Mpesa Express)** - Server-initiated payments where you prompt the customer to pay
2. **C2B (Customer to Business)** - Customer-initiated payments to Paybill/Till numbers with notifications

## Installation

The Mpesa integration uses the `iankumu/mpesa` package, which has already been installed.

## Configuration

### 1. Environment Variables

Add the following variables to your `.env` file:

```env
# Mpesa Configuration
MPESA_ENVIRONMENT=sandbox
SAFARICOM_PASSKEY=your_passkey
MPESA_BUSINESS_SHORTCODE=174379
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_INITIATOR_PASSWORD=your_initiator_password
MPESA_INITIATOR_NAME=testapi
MPESA_B2C_SHORTCODE=your_b2c_shortcode
MPESA_CALLBACK_URL="${APP_URL}/api/v1/confirm"
MPESA_B2C_RESULT_URL="${APP_URL}/api/v1/b2c/result"
MPESA_B2C_TIMEOUT_URL="${APP_URL}/api/v1/b2c/timeout"
MPESA_C2B_CONFIRMATION_URL="${APP_URL}/api/confirmation"
MPESA_C2B_VALIDATION_URL="${APP_URL}/api/validation"
```

### 2. Getting Mpesa Credentials

To get the required credentials:

1. **Create a Developer Account**: Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. **Create an App**: Once logged in, create a new app
3. **Get Credentials**: Copy the Consumer Key and Consumer Secret
4. **Get Passkey**: The passkey is provided in your developer account dashboard

### 3. Sandbox Test Credentials

For testing in the sandbox environment, you can use these credentials:

```
Initiator Name: testapi
Initiator Password: Safaricom123!!
Party A: 600988
Party B: 600000
Phone No: 254708374149
Business ShortCode: 174379
Passkey: bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
Consumer Key: oOqycdaWkvWxmoKIzr4eczZU6Lvnl8cRvYTimQpoAfHUFa7D
Consumer Secret: V86AGPMDF2QaWA0TSOmBnwxO3AEmm9q2gbIf2l2809pJLTzJWfiOGDG2rcKNGfuq
```

**Important**: These are sandbox credentials only. Never use them in production!

### 4. Environment Settings

- **Sandbox**: Use `sandbox` for testing
- **Production**: Use `production` for live payments

### 5. Callback URL

The callback URL must be publicly accessible over the internet. During development, you can use:
- LocalTunnel
- localhost.run
- Ngrok (may be blocked by Safaricom)

Example with Ngrok:
```bash
ngrok http 8000
```

Then update your `.env`:
```env
APP_URL=https://your-ngrok-url.ngrok-free.app
MPESA_CALLBACK_URL="${APP_URL}/api/v1/confirm"
MPESA_C2B_CONFIRMATION_URL="${APP_URL}/api/confirmation"
MPESA_C2B_VALIDATION_URL="${APP_URL}/api/validation"
```

## STK Push (Mpesa Express)

### How It Works

When a customer selects Mpesa as payment method during checkout:

1. The order is created with `payment_status = Pending`
2. An STK Push request is sent to the customer's phone
3. The customer receives a prompt on their phone to enter their MPESA PIN
4. The customer authorizes the payment
5. Mpesa sends a callback to the configured callback URL
6. The callback updates the order's payment status to `Paid`

### Database Table

- **mpesa_s_t_k_s**: Stores STK Push transaction details
  - merchant_request_id
  - checkout_request_id
  - result_code
  - result_desc
  - amount
  - mpesa_receipt_number
  - transaction_date
  - phonenumber

### Routes

- **POST** `/v1/mpesa/stk/push` - Initiates STK Push request
- **POST** `/api/v1/confirm` - Callback URL for Mpesa payment confirmation

## C2B (Customer to Business)

### How It Works

C2B API allows you to receive notifications when customers initiate payments to your Paybill or Till number:

1. Customer initiates payment to your Paybill/Till number via Mpesa App, USSD, etc.
2. Mpesa validates the transaction internally
3. If external validation is enabled, Mpesa sends a validation request to your Validation URL
4. Your system validates and responds (accept/reject)
5. Mpesa processes the transaction based on response
6. Upon completion, Mpesa sends a confirmation request to your Confirmation URL
7. Your system processes the payment notification and updates order status

**Note**: External validation is optional and must be activated by emailing Safaricom.

### Database Table

- **mpesa_c2_b_s**: Stores C2B transaction details
  - transaction_type
  - transaction_id
  - transaction_time
  - amount
  - business_short_code
  - account_number (BillRefNumber)
  - invoice_number
  - organization_account_balance
  - third_party_transaction_id
  - phonenumber
  - first_name
  - middle_name
  - last_name

### Routes

- **POST** `/v1/mpesa/c2b/register-urls` - Register C2B validation and confirmation URLs
- **POST** `/api/validation` - Validation callback URL
- **POST** `/api/confirmation` - Confirmation callback URL

### Registering C2B URLs

Before receiving C2B callbacks, you must register your URLs:

```bash
curl -X POST https://your-app.com/v1/mpesa/c2b/register-urls \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "shortcode": "174379"
  }'
```

The URLs registered will be:
- Validation URL: `MPESA_C2B_VALIDATION_URL` from .env
- Confirmation URL: `MPESA_C2B_CONFIRMATION_URL` from .env

**Important**: In production, URL registration is a one-time operation. To change URLs, you must delete them via the Safaricom self-service portal or email support.

### Matching Payments to Orders

The C2B integration attempts to match payments to orders using the `account_number` (BillRefNumber) field:

- When a customer pays, they should enter the order ID as the account number
- The confirmation callback will match the account_number to an order ID
- If a match is found with pending payment status, the order is updated to `Paid`

## Testing

### 1. Sandbox Testing

Use the sandbox test credentials provided above.

### 2. STK Push Testing

1. Add items to cart
2. Proceed to checkout
3. Select Mpesa as payment method
4. Enter Mpesa phone number (format: 2547XXXXXXXX)
5. Complete checkout
6. Enter PIN on your phone when prompted
7. Check that order payment status updates to `Paid`

### 3. C2B Testing

1. Register your C2B URLs using the register-urls endpoint
2. Use the Safaricom sandbox simulator to simulate C2B transactions
3. Or manually send money to your sandbox Paybill/Till with account number as order ID
4. Check that the payment is recorded in the mpesa_c2_b_s table
5. Verify that the corresponding order payment status is updated

### 4. Test Phone Numbers

Use any valid phone number in the format: `2547XXXXXXXX`

## Production Deployment

1. Update environment variables with production credentials
2. Change `MPESA_ENVIRONMENT` to `production`
3. Ensure your callback URLs are publicly accessible
4. Use HTTPS for your callback URLs
5. Register C2B URLs (one-time operation in production)
6. Test thoroughly in sandbox before going live

## Troubleshooting

### STK Push Callback Not Received

- Ensure your callback URL is publicly accessible
- Check that your URL is not blocked by Safaricom
- Verify the callback URL matches exactly what's configured
- Check server logs for any errors

### C2B Callback Not Received

- Verify URLs are registered correctly
- Ensure callback URLs are publicly accessible
- Check that URLs don't contain blocked keywords (M-PESA, Safaricom, etc.)
- Verify the shortcode is correct
- Check server logs for any errors

### Payment Failed

- Verify credentials are correct
- Check that the phone number format is correct (2547XXXXXXXX)
- Ensure sufficient funds in the Mpesa account
- Check that the shortcode is active

### Order Not Updated

- Check that the callback is being received
- Verify the order matching logic
- Check database logs for transaction records
- Verify payment status enum values
- For C2B, ensure the account number matches the order ID

### URL Registration Issues

- In production, URLs can only be registered once
- To change URLs, request deletion via Safaricom self-service portal or email support
- Ensure URLs don't contain M-PESA or Safaricom keywords
- Use HTTPS in production

## Security Notes

- Never commit `.env` file to version control
- Use environment-specific credentials
- Implement rate limiting on callback endpoints
- Validate all callback data
- Log all Mpesa transactions for audit purposes
- Don't use public URL testers (ngrok, mockbin) in production
- Ensure callback URLs are HTTPS in production

## URL Requirements

- Use publicly available IP addresses or domain names
- Production URLs must be HTTPS; Sandbox allows HTTP
- Avoid keywords like M-PESA, Safaricom, exe, exec, cmd, SQL, query in URLs
- Do not use public URL testers in production

## Support

For issues with the Mpesa integration:
- Check the [iankumu/mpesa documentation](https://github.com/iankumu/mpesa)
- Review Safaricom Developer Portal documentation
- Check application logs for error details
- For C2B URL issues, email apisupport@safaricom.co.ke or M-pesabusiness@safaricom.co.ke
