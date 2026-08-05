const net = require('net');

function testConnection(host, port) {
  return new Promise((resolve) => {
    console.log(`Testing connection to ${host}:${port}...`);
    const socket = new net.Socket();
    
    // Set a 5-second timeout
    socket.setTimeout(5000);
    
    socket.connect(port, host, () => {
      console.log(`SUCCESS: Connected to ${host}:${port} successfully!`);
      socket.destroy();
      resolve(true);
    });
    
    socket.on('timeout', () => {
      console.log(`TIMEOUT: Connection to ${host}:${port} timed out.`);
      socket.destroy();
      resolve(false);
    });
    
    socket.on('error', (err) => {
      console.log(`ERROR connecting to ${host}:${port} - ${err.message}`);
      socket.destroy();
      resolve(false);
    });
  });
}

async function run() {
  await testConnection('ihvtravel.com', 465);
  await testConnection('ihvtravel.com', 587);
  await testConnection('mail.ihvtravel.com', 465);
  await testConnection('mail.ihvtravel.com', 587);
}

run();
