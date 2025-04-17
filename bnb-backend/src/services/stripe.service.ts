import Stripe from 'stripe';
import config from '../config/config';
import Transaction from '../models/transaction.model';
import { generateTransactionReference } from '../utils/payment.util';

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2022-11-15'
});

export const createPaymentIntent = async (amount: number, bookingId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'kes',
      metadata: {
        bookingId
      }
    });

    // Save transaction
    const transaction = await Transaction.create({
      booking: bookingId,
      amount,
      paymentMethod: 'stripe',
      transactionReference: paymentIntent.id,
      status: 'pending'
    });

    return {
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction._id
    };
  } catch (error) {
    throw new Error('Failed to create payment intent');
  }
};

export const handleStripeWebhook = async (payload: any, sig: string) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      config.stripe.webhookSecret
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await Transaction.findOneAndUpdate(
          { transactionReference: paymentIntent.id },
          {
            status: 'completed',
            stripeChargeId: paymentIntent.charges.data[0].id
          }
        );

        // Update booking status
        const transaction = await Transaction.findOne({ transactionReference: paymentIntent.id });
        if (transaction) {
          await Booking.findByIdAndUpdate(transaction.booking, {
            status: 'confirmed',
            paymentStatus: 'paid'
          });
        }
        break;
      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        await Transaction.findOneAndUpdate(
          { transactionReference: failedIntent.id },
          { status: 'failed' }
        );
        break;
    }
  } catch (error) {
    console.error('Error processing Stripe webhook:', error);
    throw error;
  }
};