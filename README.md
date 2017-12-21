List files, walks a folder and gives you the list of files recursively from all the sub-folders in the directory. Returns a array of files that is there in the folder.


    const readFilesAsyncPromise = require("list-files").readFilesAsyncPromise;
    const readFilesAsync = require("list-files").readFilesAsync;
    const readFilesSync = require('list-files').readFilesSync;
    
    readFilesAsyncPromise("*your-directory*").then(files => {
        console.log(files.length);
    }).catch(error => {
        console.error(error);
    });
    
    readFilesAsync("*your-directory*", (err, results) => {
        console.log(results.length);
    });
    
    console.log(readFilesSync("*your-directory*").length);