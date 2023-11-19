const fs = require('fs');
const path = require('path');

function generateOutputPath(inputPath, settings) {
    const extension = path.extname(inputPath);
    const baseName = path.basename(inputPath, extension);
    const monoOrColor = settings.convertToMonochrome ? 'mono' : 'color';
    const timestamp = new Date().getTime();
    return path.join(settings.outputDir, `dithered-${baseName}-${settings.margin}m-${monoOrColor}-${timestamp}.bmp`);
}

module.exports = {
    generateOutputPath
};
