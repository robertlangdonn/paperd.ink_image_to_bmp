const Jimp = require('jimp');
const resizeAndDitherImage = require('./resizeAndDitherImage');
const addMargins = require('./addMargins');

function processImage(imagePath, settings, outputPath) {
    return new Promise((resolve, reject) => {
        const innerWidth = settings.targetWidth - (settings.margin * 2);
        const innerHeight = settings.targetHeight - (settings.margin * 2);

        Jimp.read(imagePath)
            .then(image => resizeAndDitherImage(image, innerWidth, innerHeight, settings.ditheringMethod, settings.convertToMonochrome))
            .then(ditheredImage => addMargins(ditheredImage, settings.targetWidth, settings.targetHeight, settings.margin))
            .then(finalImage => finalImage.writeAsync(outputPath))
            .then(() => resolve(outputPath))
            .catch(err => reject(err));
    });
}

module.exports = processImage;
