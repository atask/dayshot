// disable no-new rule, exif plugin relies on new to function properly
/*eslint no-new: 0*/

var TIMESTAMP_FORMAT = 'yyyy-MM-ddThh-mm-ss',
    HASH_LENGTH = 8;

var fs = require('fs'),
    path = require('path'),
    crypto = require('crypto');

var ExifImage = require('exif').ExifImage,
    exifdate = require('exifdate'),
    format = require('date-format');

var hash,
    imageRs, imageDate,
    newFileName;

exports.renameImage = function(imagePath, callback) {
    'use strict';
    // get the file hash
        try {
            new ExifImage({ image: imagePath }, function (error, exifData) {
                if (error) {
                    callback(error);
                } else {
                    // grab exif creation date and continue
                    imageDate = exifdate(exifData.exif.DateTimeOriginal);

                    imageRs = fs.createReadStream(imagePath);
                    hash = crypto.createHash('sha256');
                    hash.setEncoding('hex');

                    imageRs.on('end', function() {
                        hash.end();
                        var hashString = hash.read();
                        newFileName = format.asString(TIMESTAMP_FORMAT, imageDate) + 'C' + hashString.slice(-1 * HASH_LENGTH);
                        fs.rename(imagePath, path.join(path.dirname(imagePath), newFileName), callback);
                    });

                // read all file and pipe it (write it) to the hash object
                imageRs.pipe(hash);
                }
            });
        } catch (error) {
            callback(error);
        }
};
