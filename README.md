# Convert Image to Bitmap
Transform any JPG or PNG image into a compatible bitmap format suitable for [paperd.ink](https://paperd.ink) Classic and Merlot.

# How to Use
- Install the dependencies
```

npm i

```

- Put your images in the `input` folder
- In `app.js`, adjust the following settings as needed:
  - **targetWidth**: 400, // Width of paperd.ink's displays
  - **targetHeight**: 300, // Height of paperd.ink's displays
  - **margin**: 0, // Add margin on sides
  - **ditheringMethod**: 'dither565', // Currently only one dithering method is available
  - **convertToMonochrome**: true // Monochrome for paperd.ink Classic which is a monochrome e-paper display

- Run the `app.js`
```

node app.js

```
- Output dithered bmp files are saved in the `output` folder
