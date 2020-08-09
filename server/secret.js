const config = {
    AWS_REGION_NAME: 'us-east-1',
    COGNITO_POOL_ID: 'us-east-1_O5Y5OyLuS',
    COGNITO_POOL_CLIENT_ID: '2srv9j9ehlevbr27hmav8aen3g'
}

Object.keys(config).forEach(key => {
    process.env[key] = config[key]
})