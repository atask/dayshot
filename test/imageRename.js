'use strict';

var fs = require('fs'),
    path = require('path');

var mockfs = require('mock-fs');

var renamer = require('../lib/imageRename.js');

var should = require('chai').should();


describe('renameImage function', function(){
    it('should rename a jpg with EXIF tag in a "yyyy-mm-ddThh-mm-ssCxxxxxxxx" format file name', function(done) {
        // read the test image in a buffer
        var imageBuf = fs.readFileSync(path.join(process.cwd(), './test/testImage.jpg'));

        // mock fs
        mockfs({'image.jpg': imageBuf});

        renamer.renameImage('image.jpg', function testRenamed(err) {
            should.not.exist(err);

            // see if file renamed correctly
            var newFileName = fs.readdirSync('.')[0];
                newFileName.should.equal('2011-12-31T18-07-29C23a0f622');

            // restore original fs
            mockfs.restore();

            done();
        });
    });

    it('should return an error if file does not exist', function(done) {
        // mock fs
        mockfs({});

        renamer.renameImage('image.jpg', function testRenamed(err) {
        should.exist(err);
        err.should.be.an.instanceof(Error);

            // restore original fs
            mockfs.restore();

            done();
        });
    });

    it('should return an error if file has no EXIF tag', function(done) {
        // mock fs
        mockfs({'image.jpg': 'dummy file'});

        renamer.renameImage('image.jpg', function testRenamed(err) {
        should.exist(err);
            err.should.be.an.instanceof(Error);

            // restore original fs
            mockfs.restore();

            done();
        });
    });
});
