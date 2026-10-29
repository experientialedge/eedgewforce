// CommonJS entry point for cPanel/CloudLinux Passenger and DirectAdmin.
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
process.env.NODE_ENV ||= 'production';
import('./server/src/index.js').catch(() => {
  console.error('EdgeWForce could not start. Check the private application log and server environment configuration.');
  process.exitCode = 1;
});
