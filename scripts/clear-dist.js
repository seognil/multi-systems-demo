const path = require('path');
const fs = require('fs');

const dist = path.join(process.cwd(), 'dist');

if (fs.existsSync(dist)) {
  fs.readdirSync('dist')
    .map((e) => path.join(dist, e))
    .forEach((e) => fs.unlinkSync(e));
}
