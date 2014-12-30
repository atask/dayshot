var imageDir = './images',
    fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),

    // list of file to process
    basePath = path.join(__dirname, imageDir),
    files = fs.readdirSync(basePath),

    hash, hashString,
    imagePath, imageRs; 

files.forEach(function renameImage(imageFileName) {
    // get the file hash
    debugger;
    if (path.extname(imageFileName).toLowerCase() === '.jpg') {
        imagePath = path.join(basePath, imageFileName);
        imageRs = fs.createReadStream(imagePath);
        hash = crypto.createHash('sha256');
        hash.setEncoding('hex');

        imageRs.on('end', function() {
            hash.end();
            hashString = hash.read();
            console.log(hashString);
        });

        // read all file and pipe it (write it) to the hash object
        imageRs.pipe(hash);
    }
});

/*
fImage = require('exif').ExifImage;

try {
    new ExifImage({ image : 'myImage.jpg' }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData); // Do something with your data!
    });
} catch (error) {
    console.log('Error: ' + error.message);
}
*/

