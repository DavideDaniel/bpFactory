const fs = require('fs');
const Transform = require('stream').Transform;
const file = process.argv[3];
const regEx = process.argv[2];
const path = require('path');

const regex = r => new RegExp(r, 'g');

function replaceBuffer(buffer, reg) {
  const newStr = String(buffer).replace(reg, file);
  return Buffer(newStr);
}

const replacer = new Transform({
  transform(data, encoding, callback) {
    callback(null, replaceBuffer(data, regex(regEx)));
  }
});

function copyFile(source, target, cb) {
  let cbCalled = false;

  const read = fs.createReadStream(source);
  const write = fs.createWriteStream(target);

  read.on("error", (err) => {
    done(err);
  });

  write.on("error", (err) => {
    done(err);
  });

  write.on("close", (fn) => {
    fn();
    done();
  });

  read.pipe(replacer).pipe(write);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

// copyFile(`${path.resolve(__dirname, './template.js')}`, `./src/components/${file}.js`, console.log);

const makeCopy = (fn, args, cb) => {
  fn(...args);
  if(cb) cb();
}

module.exports = makeCopy(copyFile, [`${path.resolve(__dirname, './template.js')}`, `./${file}.js`, console.log], () => console.log(file, 'boilerplate generated at ', process.cwd() + '/'+ file));