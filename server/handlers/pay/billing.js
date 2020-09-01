const stripe = require('stripe')(process.env.STRIPE_KEY);
const { env } = require('@util')
module.exports = async event => {

  const customer = await stripe.customers.retrieve(
    event.data.stripe_id
  );

  const {
    subscriptions: {
      data
    }
  } = customer
  if (!data.length) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      allow_promotion_codes: true,
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 14,
        items: [{
          plan: env.product()
        }],
      },
      success_url: env.domain(),
      cancel_url: env.domain(),
    });
    return {
      action: 'redirect',
      session_id: session.id,
      stripe_pk: env.stripePk()
    }
  } else {
    return { action: 'none' }
  }
}