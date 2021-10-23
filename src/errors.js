class DnsError extends Error {
    constructor( ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params)
  
      this.name = 'DnsError'
      this.date = new Date()
    }
}

class ConnectPortError extends Error {
    constructor( ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params)
  
      this.name = 'ConnectPortError'
      this.date = new Date()
    }
}


module.exports = {
    DnsError,
    ConnectPortError,
  }