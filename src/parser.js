const fs = require('fs');

function portScannerParser(path) {
    const hosts = {};
    const data = fs.readFileSync(path, 'utf8').split('\n');

    if (data.length === 0) {
        throw new Error("input file is empty")
    }

    for (line of data){
        [host,port] = line.split(' ');
        if (!(host in hosts)) {
            hosts[host] = {
                hostName: host,
                ipV4: '0',
                ipV6: '0',
                ports: [{port: port, status: 'new'}], // status in file or object
                dnsTimeMs: 0.0,
                dnsStatus: 'new',
            };
        } else {
            hosts[host].ports.push({port: port, status: ''});
        }
    };
    return hosts;
}

module.exports = portScannerParser;