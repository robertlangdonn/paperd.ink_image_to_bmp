# Convert Image to Bitmap
Transform any JPG or PNG image into a compatible bitmap format suitable for paperd.ink's Classic and Merlot displays.

# How to use
- Install the dependencies
```

`npm i`

```

- Put your images in the `input` folder
- In `app.js`, adjust the following settings as needed:
  - targetWidth: 400, // Width of paperd.ink's displays
  - targetHeight: 300, // Height of paperd.ink's displays
  - margin: 0, // Add margin on sides
  - ditheringMethod: 'dither565', // Currently only one method is available
  - convertToMonochrome: false // Monochrome for paperd.ink Classic monochrome display

- Run the `app.js`
```

node app.js

```
- Output files are saved in the `Output` folder
