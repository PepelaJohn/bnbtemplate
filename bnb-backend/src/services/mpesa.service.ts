import axios from 'axios';
import config from '../config/config';
import Transaction from '../models/transaction.model';
import { generateTransactionReference } from '../utils/payment.util';

const authToken = Buffer.from(`${config.mpesa.consumerKey}:${config.mpesa.consumerSecret}`).toString('base64');

export const getMpesaAuthToken = async () => {
  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${authToken}`
      }
    });
    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to get M-Pesa auth token');
  }
};

export const initiateSTKPush = async (phone: string, amount: number, bookingId: string) => {
  try {
    const token = await getMpesaAuthToken();
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -5);
    const password = Buffer.from(`${config.mpesa.businessShortcode}${config.mpesa.passkey}${timestamp}`).toString('base64');
    const reference = generateTransactionReference();

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: config.mpesa.businessShortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: config.mpesa.businessShortcode,
        PhoneNumber: phone,
        CallBackURL: config.mpesa.callbackUrl,
        AccountReference: reference,
        TransactionDesc: `Booking ${bookingId}`
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Save transaction
    await Transaction.create({
      booking: bookingId,
      amount,
      paymentMethod: 'mpesa',
      transactionReference: reference,
      status: 'pending'
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to initiate STK push');
  }
};

export const handleMpesaCallback = async (data: any) => {
  try {
    const result = data.Body.stkCallback;
    const checkoutRequestID = result.CheckoutRequestID;
    const resultCode = result.ResultCode;
    const resultDesc = result.ResultDesc;

    if (resultCode === '0') {
      const item = result.CallbackMetadata.Item;
      const amount = item.find((i: any) => i.Name === 'Amount').Value;
      const mpesaReceiptNumber = item.find((i: any) => i.Name === 'MpesaReceiptNumber').Value;
      const transactionDate = item.find((i: any) => i.Name === 'TransactionDate').Value;
      const phoneNumber = item.find((i: any) => i.Name === 'PhoneNumber').Value;

      // Update transaction status
      await Transaction.findOneAndUpdate(
        { transactionReference: checkoutRequestID },
        {
          status: 'completed',
          mpesaReceiptNumber,
          processedAt: transactionDate
        }
      );

      // Update booking status
      const transaction = await Transaction.findOne({ transactionReference: checkoutRequestID });
      if (transaction) {
        await Booking.findByIdAndUpdate(transaction.booking, {
          status: 'confirmed',
          paymentStatus: 'paid'
        });
      }
    } else {
      // Update transaction status to failed
      await Transaction.findOneAndUpdate(
        { transactionReference: checkoutRequestID },
        { status: 'failed' }
      );
    }
  } catch (error) {
    console.error('Error processing M-Pesa callback:', error);
  }
};