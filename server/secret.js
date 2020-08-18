const config = {
    AWS_REGION_NAME: 'us-east-1',
    COGNITO_POOL_ID: 'us-east-1_O5Y5OyLuS',
    COGNITO_POOL_CLIENT_ID: '2srv9j9ehlevbr27hmav8aen3g',
    DEV: 'true',
    STRIPE_KEY: 'sk_test_51HHA4oJaLlNJzRE1uQykxznjZp0B1LWUkiBPHyDkVK8buzhVIq3EqWm7gqlkJtor6wvmc20xU35MTvjOk5eFdHWQ00Q10Vlqo6',
    STRIPE_KEY_PROD: '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'
}

Object.keys(config).forEach(key => {
    process.env[key] = config[key]
})