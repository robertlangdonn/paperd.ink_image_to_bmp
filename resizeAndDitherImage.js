const Jimp = require('jimp');

function resizeAndDitherImage(image, innerWidth, innerHeight, ditheringMethod, convertToMonochrome) {
    const scalingFactor = Math.min(innerWidth / image.bitmap.width, innerHeight / image.bitmap.height);
    const resizeWidth = Math.floor(image.bitmap.width * scalingFactor);
    const resizeHeight = Math.floor(image.bitmap.height * scalingFactor);

    // Resize the image
    image = image.resize(resizeWidth, resizeHeight);

    // Apply grayscale if convertToMonochrome is true
    if (convertToMonochrome) {
        image = image.greyscale();
    }

    // Apply the specified dithering method
    switch (ditheringMethod) {
        case 'dither565':
            return image.dither565();
        // Add more cases for different dithering methods as needed
        default:
            // If no dithering method is specified, return the image as is
            return image;
    }
}

module.exports = resizeAndDitherImage;
