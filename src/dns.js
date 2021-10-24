const dnsPromises = require('dns').promises;
const { performance } = require('perf_hooks');
const { setTimeout } = require('timers');
const { env } = require('process');
const { DnsError } = require('./errors');

async function portScannerDns(hostName) {
    return new Promise(async (resolve, reject) => {
        const timeoutId = setTimeout(() => reject('dns timeout'), env.DNS_TIMEOUT);
        
        const startTime = performance.now();
        try{
            const res = await dnsPromises.resolve(hostName, 'ANY');
            const endTime = performance.now();
            
            const IPv4 = res.find(element => element.type === 'A');
            const IPv6 = res.find(element => element.type === 'AAAA');
            const IPv6Add = IPv6 !== undefined ? IPv6.address : undefined; 
            
            resolve({ IPv4: IPv4.address, IPv6: IPv6Add, timeMS: parseFloat(endTime - startTime).toFixed(2) });
        } catch(e) {
            clearTimeout(timeoutId);
            reject(new DnsError(e));
        }
    })
}

module.exports = portScannerDns;