var imageDir = './images',
    hashLength = 8,
    fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    ExifImage = require('exif').ExifImage,
    exifdate = require('exifdate'),
    format = require('date-format'),

    // list of file to process
    basePath = path.join(__dirname, imageDir),
    files = fs.readdirSync(basePath),

    hash,
    imagePath, imageRs, imageDate, imageHash,
    newFileName; 

files.forEach(function renameImage(imageFileName) {
    // get the file hash
    if (path.extname(imageFileName).toLowerCase() === '.jpg') {
        imagePath = path.join(basePath, imageFileName);
        try {
            new ExifImage({ image : imagePath }, function (error, exifData) {
                if (error) {
                    console.log(imageFileName + ': ' + error.message);
                } else {
                    // grab exif creation date and continue
                    imageDate = exifdate(exifData.exif.DateTimeOriginal);

                    imageRs = fs.createReadStream(imagePath);
                    hash = crypto.createHash('sha256');
                    hash.setEncoding('hex');

                    imageRs.on('end', function() {
                        hash.end();
                        hashString = hash.read();
                        newFileName = format.asString('yyyy-MM-dd', imageDate) + '-' + hashString.slice(-1 * hashLength);
                        console.log('SUCCESS: ' + imageFileName + ' -> ' + newFileName);
                    });

                // read all file and pipe it (write it) to the hash object
                imageRs.pipe(hash);
                }
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    }
});

