const config = {
    DB_NAME: 'logflights',
    DB_PASSWORD: 'vettery',
    DB_USER: 'danbaker',
    DB_HOST: 'localhost'
}

Object.keys(config).forEach(key => {
    process.env[key] = config[key]
})