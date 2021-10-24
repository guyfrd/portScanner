require('dotenv').config()
const parser = require('./src/parser')
const dnsResolve = require('./src/dns');
const checkPort = require('./src/ports');
const { DnsError, ConnectPortError } = require('./src/errors');
const commander = require('commander'); 
const util = require('util');


const printResults = (hosts) => {
    console.log(`----PortScanner----`);
    for (const [hostName, host] of Object.entries(hosts)) {
        console.log(`host name: ${hostName}`);
        console.log(`IPv4: ${host.IPv4}`);
        console.log(`IPv6: ${host.IPv6 !== undefined ? host.IPv6 : 'not exist'}`);
        console.log(`dns lookup: status: ${host.dnsStatus} time: ${host.dnsTimeMs}`);
        host.ports.forEach((port) => {
            console.log(`  port: ${port.port}  status: ${port.status}`);
        });
        console.log(`-------------------------`)
    }
}

const scan = async (hosts) => {
    for (const [hostName, host] of Object.entries(hosts)) {
        try {
            const { IPv4, IPv6, timeMS } = await dnsResolve(hostName);
            host.dnsStatus = 'success';
            host.IPv4 = IPv4;
            host.IPv6 = IPv6;
            host.dnsTimeMs = timeMS;
            const ipAdd = options.ip === 'IPv6' && host.IPv6 !== undefined ? host.IPv6 : host.IPv4 
            const res = await Promise.all(host.ports.map((port) => {
                return checkPort(port.port, ipAdd);
            }));
            host.ports = res;
        } catch(e) {
            if (e instanceof DnsError) {
                host.dnsStatus = 'failed';
            }
            console.log(e);
            continue;
        }
    }
}

const portScanner = async () => {
    const hosts = parser(options.input);
    await scan(hosts);
    if (options.json) {
        console.log(JSON.stringify(hosts));
    } else {
        printResults(hosts);
    }
}

const program = new commander.Command();
program
  .requiredOption('-i, --input <path>', 'input file for portScanner')
  .option('-j, --json', 'get output as json format')
  .option('-p, --ipv6', 'use the IPv6 address if exist', 'IPv4');

program.parse(process.argv);
const options = program.opts();

portScanner();

//TODO: logfile
//TODO: output to directory