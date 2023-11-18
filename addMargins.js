const Jimp = require('jimp');

function addMargins(image, targetWidth, targetHeight, margin) {
    const canvas = new Jimp(targetWidth, targetHeight, 0xFFFFFFFF);
    const x = Math.floor((targetWidth - image.bitmap.width) / 2);
    const y = Math.floor((targetHeight - image.bitmap.height) / 2);

    return canvas.composite(image, x, y, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 1
    });
}

module.exports = addMargins;
