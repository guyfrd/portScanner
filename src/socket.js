const net = require('net');
const { ConnectPortError } = require('./errors');
const { env } = require('process');

function checkPort(port, ip) {
    var status = null;
    var error = null;
    
    return new Promise((resolve, reject) => {
        var socket = new net.Socket();
        socket.once('connect', () => {
            status = 'open'
            socket.destroy();
            resolve({port, status});
        });
        
        socket.setTimeout(Number(env.PORT_CHECK_TIMEOUT));
        socket.once('timeout', () => {
            status = 'close';
            socket.destroy();

            resolve({port, status});
        });

        socket.once('error', (error) => {
            socket.destroy();

            if (error.code === 'ECONNREFUSED') {
                status = 'close';
                resolve({port, status});
            } else {
                status = 'error';
                reject({port, status});
            }
        })
        
        socket.once('close', () => {
            socket.destroy();

            resolve({port, status});
        });
        
        socket.connect(port, ip);
    });
}

module.exports = checkPort