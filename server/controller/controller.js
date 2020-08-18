const asyncWrapper = require('middleware/async-wrapper')
const {
  storeFlight,
  retrieveFlights,
  updateFlight,
  exportRecords,
  billing,
  signup,
  login,
  reset,
  forgot,
  validate,
  renew,
} = require('@handlers')
const stripe = require('stripe')(process.env.STRIPE_KEY)

module.exports = app => {


  app.post('/billing', asyncWrapper(async(req, res) => {
    const response = await billing(req.body)
    res.status(200).send(response)
    // // try {
    //   const {
    //     subscriptions: {
    //       data
    //     }
    //   } = customer
    //   if (!data.length) {
    //     console.log(stripe)

    //     return
    //     var stripe = Stripe('pk_live_51HHA4oJaLlNJzRE1so0MGblTIeRtlNFquZkCYFEA5IkwZ3kbyb83a8r1sJJ25sWMiBAnRPXqxld9H05BkBH6Uk1v00939TbkgM');
    //     stripe.redirectToCheckout({
    //       // Make the id field from the Checkout Session creation API response
    //       // available to this file, so you can provide it as parameter here
    //       // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    //       sessionId: '${session.id}'
    //     }).then(function (result) {
    //       // error, display the localized error message to your customer
    //     });
    //   // }
    // }
    // //{"id":"plan_Hqt30iREzLz8Uv","object":"plan","active":true,"aggregate_usage":null,"amount":1000,"amount_decimal":"1000","billing_scheme":"per_unit","created":1597682004,"currency":"usd","interval":"month","interval_count":3,"livemode":true,"metadata":{},"nickname":null,"product":"prod_Hqt3lY5HoiZQX9","tiers":null,"tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"}
    // res.status(200).send(customr)
  }))

  app.get('/create-plan', asyncWrapper(async(req, res) => {
    const session = await stripe.plans.create({
      amount: 1000,
      interval: 'month',
      currency: 'usd',
      interval_count: 3,
      product: {
        name: 'prod_HqsIp08Erwm3Py'
      }
    })
    //{"id":"plan_Hqt30iREzLz8Uv","object":"plan","active":true,"aggregate_usage":null,"amount":1000,"amount_decimal":"1000","billing_scheme":"per_unit","created":1597682004,"currency":"usd","interval":"month","interval_count":3,"livemode":true,"metadata":{},"nickname":null,"product":"prod_Hqt3lY5HoiZQX9","tiers":null,"tiers_mode":null,"transform_usage":null,"trial_period_days":null,"usage_type":"licensed"}
    res.status(200).send(session)
  }))
  app.get('/pay', asyncWrapper(async(req, res) => {
    // (async () => {

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: 'danielebaker@gmail.com',
        allow_promotion_codes: true,
        mode: 'subscription',
        subscription_data: {
          // coupon: 'fANOufkh',
          trial_period_days: 14,
          items: [{
            plan: 'price_1HHAXWJaLlNJzRE1NGCq63Xd'
          }],
        },
        success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel',
      });

      res.status(200).send(session)

      return res.status(200).send(`
        <html>
          <head>
            <script src="https://js.stripe.com/v3/"></script>
            <script type="text/javascript">
              var stripe = Stripe('pk_live_51HHA4oJaLlNJzRE1so0MGblTIeRtlNFquZkCYFEA5IkwZ3kbyb83a8r1sJJ25sWMiBAnRPXqxld9H05BkBH6Uk1v00939TbkgM');
              stripe.redirectToCheckout({
                // Make the id field from the Checkout Session creation API response
                // available to this file, so you can provide it as parameter here
                // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
                sessionId: '${session.id}'
              }).then(function (result) {
                // error, display the localized error message to your customer
              });
            </script>
          </head>
        </html>
      `)
  }))

  app.post('/flight', asyncWrapper(async(req, res) => {
    storeFlight(req.body)
    res.status(200).send()
  }))

  app.post('/flights', asyncWrapper(async(req, res) => {
    const flights = await retrieveFlights(req.body)
    res.status(200).send(flights)
  }))

  app.put('/flights', asyncWrapper(async(req, res) => {
    await updateFlight(req.body)
    res.status(200).send()
  }))

  app.post('/export-records', asyncWrapper(async(req, res) => {
    console.log('req.body')
    console.log(req.body)
    const flights = await exportRecords(req.body)
    res.status(200).send(flights)
  }))

  app.post('/validate', asyncWrapper(async(req,res) => {
    const response = await validate(req.body)
    return res.status(200).send(response)
  }))

  app.post('/renew', asyncWrapper(async(req,res) => {
    const response = await renew(req.body)
    console.log('renew response')
    return res.status(200).send(response)
  }))

  app.post('/signup', asyncWrapper(async(req, res) => {
    // try {
      console.log('signup')
      const response = await signup(req.body)
      console.log('login response')
      return res.status(200).send(response)
    // } catch (err) {
    //   return res.status(400).send(err)
    // }
  }))


  
  app.post('/login', asyncWrapper(async(req, res) => {

    try {
      response = await login(req.body)
      return res.status(200).send(response)
    } catch (err) {
      console.log(err)
      return res.status(400).send(err)
    }
  }))

  app.post('/forgot', asyncWrapper(async(req, res) => {
    try {
      respons = await forgot(req.body)
    } catch (err) {
      return res.status(400).send(err)
    }
  }))

  app.post('/reset', asyncWrapper(async(req, res) => {
    try {
      respons = await signup(req.body)
    } catch (err) {
      return res.status(400).send(err)
    }
  }))

  app.get('*', asyncWrapper(async(req, res) => {
    res.status(200).send()
  }))
}
