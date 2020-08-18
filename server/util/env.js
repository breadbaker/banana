module.exports = () => {
}

module.exports = {
  domain: () => {
    return process.env.DEV ? 'http://localhost:8080' : 'https://www.flightlogbox.com'
  },
  product: () => {
    return process.env.DEV ? 'price_1HHIhYJaLlNJzRE1oEYNUt4o' : 'price_1HHAXWJaLlNJzRE1NGCq63Xd'
  },
  stripePk: () => {
    return process.env.DEV ? 'pk_test_51HHA4oJaLlNJzRE1iOUEZet29j19aM3g7vv71HCfxf5L1OWOIpjygAH4MCs4mmCS00jj2jyf1G9g6N6IeDe9B6Vw00wXrL2xbS' : 'pk_live_51HHA4oJaLlNJzRE1so0MGblTIeRtlNFquZkCYFEA5IkwZ3kbyb83a8r1sJJ25sWMiBAnRPXqxld9H05BkBH6Uk1v00939TbkgM'
  }
}
