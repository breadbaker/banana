const config = {
    DB_NAME: 'logflights',
    DB_PASSWORD: 'vettery',
    DB_USER: 'danbaker',
    DB_HOST: 'localhost',
    COGNITO_POOL_ID: 'us-east-1_O5Y5OyLuS',
    COGNITO_POOL_CLIENT_ID: '4cubl7i34aqaq3rtbni832hpc4'
}

Object.keys(config).forEach(key => {
    process.env[key] = config[key]
})