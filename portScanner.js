require('dotenv').config()
const parser = require('./src/parser')
const dnsResolve = require('./src/dns');
const checkPort = require('./src/ports');
const { DnsError, ConnectPortError } = require('./src/errors');
const commander = require('commander'); 
const util = require('util');

const printResults = (JSONformat, hosts) => {
    if (JSONformat) {
        console.log(JSON.stringify(hosts));
    } else {
        console.log(util.inspect(hosts, false, null, true)); //TODO: create more readable output 
    }
}

const scan = async (hosts) => {
    for (const [hostName, host] of Object.entries(hosts)) {
        try {
            const { ipV4, ipV6, timeMS } = await dnsResolve(hostName);
            host.dnsStatus = 'success';
            host.ipV4 = ipV4;
            host.ipV6 = ipV6;
            host.dnsTimeMs = timeMS;
            const ipAdd = options.ip === 'ipV6' && host.ipV6 !== undefined ? host.ipV6 : host.ipV4 
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
    printResults(options.json, hosts);
}

const program = new commander.Command();
program
  .requiredOption('-i, --input <path>', 'input file for portScanner')
  .option('-j, --json', 'get output as json format')
  .option('-p, --ip <ver>', 'use the ip version if exist', 'ipV4');

program.parse(process.argv);
const options = program.opts();

portScanner();

//TODO: logfile
//TODO: output to directory