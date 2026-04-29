# Mpesa Payment Integration

This document explains how to configure and use the Mpesa payment integration in the 2B Gamers Store application.

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

### 3. Environment Settings

- **Sandbox**: Use `sandbox` for testing
- **Production**: Use `production` for live payments

### 4. Callback URL

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
```

## How It Works

### 1. Checkout Flow

When a customer selects Mpesa as payment method during checkout:

1. The order is created with `payment_status = Pending`
2. An STK Push request is sent to the customer's phone
3. The customer receives a prompt on their phone to enter their MPESA PIN
4. The customer authorizes the payment
5. Mpesa sends a callback to the configured callback URL
6. The callback updates the order's payment status to `Paid`

### 2. Database Tables

The integration uses the following tables:

- **mpesa_s_t_k_s**: Stores STK Push transaction details
  - merchant_request_id
  - checkout_request_id
  - result_code
  - result_desc
  - amount
  - mpesa_receipt_number
  - transaction_date
  - phonenumber

### 3. Routes

- **POST** `/v1/mpesa/stk/push` - Initiates STK Push request
- **POST** `/api/v1/confirm` - Callback URL for Mpesa payment confirmation

## Testing

### 1. Sandbox Testing

Use the following test credentials for sandbox:
- **Shortcode**: 174379
- **Passkey**: bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
- **Consumer Key/Secret**: Get from Safaricom Developer Portal

### 2. Test Phone Numbers

Use any valid phone number in the format: `2547XXXXXXXX`

### 3. Test Process

1. Add items to cart
2. Proceed to checkout
3. Select Mpesa as payment method
4. Enter Mpesa phone number
5. Complete checkout
6. Enter PIN on your phone when prompted
7. Check that order payment status updates to `Paid`

## Production Deployment

1. Update environment variables with production credentials
2. Change `MPESA_ENVIRONMENT` to `production`
3. Ensure your callback URL is publicly accessible
4. Use HTTPS for your callback URL
5. Test thoroughly in sandbox before going live

## Troubleshooting

### Callback Not Received

- Ensure your callback URL is publicly accessible
- Check that your URL is not blocked by Safaricom
- Verify the callback URL matches exactly what's configured in Mpesa
- Check server logs for any errors

### Payment Failed

- Verify credentials are correct
- Check that the phone number format is correct (2547XXXXXXXX)
- Ensure sufficient funds in the Mpesa account
- Check that the shortcode is active

### Order Not Updated

- Check that the callback is being received
- Verify the order matching logic in `App\Mpesa\STKPush`
- Check database logs for STK Push records
- Verify payment status enum values

## Security Notes

- Never commit `.env` file to version control
- Use environment-specific credentials
- Implement rate limiting on callback endpoints
- Validate all callback data
- Log all Mpesa transactions for audit purposes

## Support

For issues with the Mpesa integration:
- Check the [iankumu/mpesa documentation](https://github.com/iankumu/mpesa)
- Review Safaricom Developer Portal documentation
- Check application logs for error details
