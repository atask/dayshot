var imageDir = './images';
var fs = require('fs');
var crypto = require('crypto');

var files = fs.readdirSync(path);

files.forEach(function renameImage(imagePath) {
    
});

// the file you want to get the hash    
var fd = fs.createReadStream(‘myImage.jpg’);
var hash = crypto.createHash('sha256’);
hash.setEncoding('hex');

var result = ‘none’;

fd.on('end', function() {
    hash.end();
    result = hash.read(); // the desired sha1sum
    console.log(result);
});

// read all file and pipe it (write it) to the hash object
fd.pipe(hash);

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

