const crypto = require('crypto');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

const email = process.argv[2] || 'admin@honworth.com';
const password = process.argv[3] || 'admin123';
const id = crypto.randomUUID();
const passwordHash = hashPassword(password);

console.log('============================================================');
console.log('ADMIN USER SQL GENERATOR');
console.log('============================================================');
console.log(`Email:    ${email}`);
console.log(`Password: ${password}`);
console.log(`UUID:     ${id}`);
console.log('============================================================');
console.log('Run the following SQL in your phpMyAdmin:');
console.log('');
console.log(`INSERT INTO admins (id, email, password_hash) VALUES ('${id}', '${email}', '${passwordHash}');`);
console.log('============================================================');
