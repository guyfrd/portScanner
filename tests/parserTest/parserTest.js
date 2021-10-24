const parser = require('../../src/parser');
const _ = require('lodash');
const colors = require('colors');

const accept = {
    localhost: {
      hostName: 'localhost',
      ip: 'waitingDns',
      ports: [ {port: 123, status: 'new'},
               {port: 111, status: 'new'} ],
      dnsTimeMs: 0,
      dnsStatus: 'new',
      IPv6: false
}, coolParser: {
    hostName: 'coolParser',
    ip: 'waitingDns',
    ports: [ {port: 222, status: 'new'},
             {port: 333, status: 'new'},
             {port: 111, status: 'new'}  ],
    dnsTimeMs: 0,
    dnsStatus: 'new',
    IPv6: false
}}


const res = parser('./parserTestInput.txt');

if (_.isEqual(res, accept)) {
    console.log('portScannerParser test- ' + 'FAIL'.red);
} else {
    console.log('portScannerParser test  - ' + 'PASS'.green);
}

