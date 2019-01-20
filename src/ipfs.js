const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'localhost', port: 5001 });

export default ipfs;
