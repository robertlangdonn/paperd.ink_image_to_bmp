const fs = require('fs');
const path = require('path');
const processImage = require('./imageProcessor');
const fileOps = require('./fileOps');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output_bmp');

function processImagesFromDirectory(inputDir, settings) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error('Error reading input directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(inputDir, file);
            const extname = path.extname(file).toLowerCase();
            if (extname === '.jpg' || extname === '.png') {
                const outputPath = fileOps.generateOutputPath(filePath, settings);

                processImage(filePath, settings, outputPath)
                    .then(savedPath => console.log(`Image processed and saved as ${savedPath}`))
                    .catch(console.error);
            }
        });
    });
}

// Usage
const settings = {
    targetWidth: 400,
    targetHeight: 300,
    margin: 5,
    ditheringMethod: 'dither565',
    convertToMonochrome: true,
    outputDir: outputDir
};

processImagesFromDirectory(inputDir, settings);
