export default () => window.location.host.includes('localhost') ? 'http://localhost:3000' : 'https://api.flightlogbox.com'
