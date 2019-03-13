const os = require('os');
const ifaces = os.networkInterfaces();

// return the ip for the current computer
export const getIP = () => {
    const ipAddresses = [];

    Object.keys(ifaces).forEach(ifname => {
        let alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return false;
            }
            ipAddresses.push(iface.address);
            ++alias;
        });
    });

    return ipAddresses[0];
};

