const Jimp = require('jimp');
const resizeAndDitherImage = require('./resizeAndDitherImage');
const addMargins = require('./addMargins');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'input'); // Directory where your input images are stored
const outputDir = path.join(__dirname, 'output'); // Directory where you want to save processed images

function generateOutputPath(inputPath, settings) {
    const extension = path.extname(inputPath);
    const baseName = path.basename(inputPath, extension);
    const monoOrColor = settings.convertToMonochrome ? 'mono' : 'color';
    const timestamp = new Date().getTime();
    return path.join(outputDir, `dithered-${baseName}-${settings.margin}m-${monoOrColor}-${timestamp}${extension}`);
}

function processImage(imagePath, settings, callback) {
    const innerWidth = settings.targetWidth - (settings.margin * 2);
    const innerHeight = settings.targetHeight - (settings.margin * 2);
    const outputPath = generateOutputPath(imagePath, settings);

    Jimp.read(imagePath)
        .then(image => resizeAndDitherImage(image, innerWidth, innerHeight, settings.ditheringMethod, settings.convertToMonochrome))
        .then(ditheredImage => addMargins(ditheredImage, settings.targetWidth, settings.targetHeight, settings.margin))
        .then(finalImage => finalImage.write(outputPath, callback))
        .catch(err => {
            console.error(err);
            if (callback) callback(err);
        });
}

function processImagesFromDirectory(inputDir, settings) {
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error('Error reading input directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(inputDir, file);
            if (path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png') {
                processImage(filePath, settings, (err) => {
                    if (err) {
                        console.error(`Error processing image ${filePath}:`, err);
                    } else {
                        console.log(`Image ${filePath} processed and saved as ${generateOutputPath(filePath, settings)}`);
                    }
                });
            }
        });
    });
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Usage
const settings = {
    targetWidth: 400,
    targetHeight: 300,
    margin: 0,
    ditheringMethod: 'dither565',
    convertToMonochrome: false
};

processImagesFromDirectory(inputDir, settings);
