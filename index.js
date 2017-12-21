const fs = require('fs');
const path = require('path');

const readFilesAsyncPromise = (dir) => {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stat) => {
            if (err) return reject(err);
            let fileList = [];
            if (stat.isDirectory()) {
                fs.readdir(dir, (err, files) => {
                    if (err) return reject(err);
                    let remaining = files.length;
                    if (!remaining) return resolve(fileList);
                    files.forEach((file) => {
                        let filePath = path.resolve(dir, file);
                        readFilesAsyncPromise(filePath).then(result => {
                            fileList = fileList.concat(result);
                            if (!--remaining) return resolve(fileList);
                        });
                    });
                });
            } else {
                fileList.push(dir)
                resolve(fileList);
            }
        });
    });
};

const readFilesAsync = (dir, done) => {
    fs.stat(dir, (err, stat) => {
        if (err) return done(err);
        let fileList = [];
        if (stat.isDirectory()) {
            fs.readdir(dir, (err, files) => {
                let remaining = files.length;
                if (!remaining) return done(null, fileList);
                files.forEach(file => {
                    let filePath = path.resolve(dir, file);
                    readFilesAsync(filePath, (err, result) => {
                        fileList = fileList.concat(result);
                        if (!--remaining) return done(null, fileList);
                    })
                });
            });
        } else {
            fileList.push(dir)
            done(null, fileList);
        }
    });
};

const readFilesSync = (dir) => {
    let fileList = [];
    let filesInDir = fs.readdirSync(dir);
    filesInDir.forEach(file => {
        let filePath = path.resolve(dir, file);
        let stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            fileList = fileList.concat(readFilesSync(filePath));
        } else {
            fileList.push(file);
        }
    });
    return fileList;
};

module.exports.readFilesAsyncPromise = readFilesAsyncPromise;
module.exports.readFilesAsync = readFilesAsync;
module.exports.readFilesSync = readFilesSync;