const fs = require('fs');
const path = require('path');
const target = path.join(__dirname, '..', 'bad-code.js');
try {
  const src = fs.readFileSync(target, 'utf8');
  new Function(src);
  console.log('Syntax: OK');
} catch (e) {
  console.error('Syntax Error:', e && e.message ? e.message : e);
  process.exit(1);
}
