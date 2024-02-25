const Base64 = {
  size: (base64) => {
    const len = base64.replace(/^data:image\/\w+;base64,/, "").length;
    return (len - 814) / 1.37;
    // return len * 3 / 4
  },

  // strip off the data: url prefix to get just the base64-encoded bytes
  // var data = img.replace(/^data:image\/\w+;base64,/, "");
  mime: (base64) => {
    return base64.split(";")[0].match(/jpeg|png|gif/)[0];
  },
  data: (base64) => {
    return base64.replace(/^data:image\/\w+;base64,/, "");
  },

  prefix: (ext) => {
    return `data:${ext};base64,`;
  }
};

const Converter = {
  base64ToFile: (base64, mime = "image/jpeg") => {
    const byteString = window.atob(base64);
    const content = [];
    for (let i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i);
    }
    return new window.Blob([new Uint8Array(content)], { type: mime });
  },
  imageToCanvas: (width, height, orientation) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;
    // canvas.style.width = width
    // canvas.style.height = height

    return (image) => {
      if (!orientation || orientation > 8) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas;
      }
      if (orientation > 4) {
        canvas.width = height;
        canvas.height = width;
        // canvas.style.width = height
        // canvas.style.height = width
      }
      switch (orientation) {
        case 2:
          // horizontal flip
          context.translate(width, 0);
          context.scale(-1, 1);
          break;
        case 3:
          // 180° rotate left
          context.translate(width, height);
          context.rotate(Math.PI);
          break;
        case 4:
          // vertical flip
          context.translate(0, height);
          context.scale(1, -1);
          break;
        case 5:
          // vertical flip + 90 rotate right
          context.rotate(0.5 * Math.PI);
          context.scale(1, -1);
          break;
        case 6:
          // 90° rotate right
          context.rotate(0.5 * Math.PI);
          context.translate(0, -height);
          break;
        case 7:
          // horizontal flip + 90 rotate right
          context.rotate(0.5 * Math.PI);
          context.translate(width, -height);
          context.scale(-1, 1);
          break;
        case 8:
          // 90° rotate left
          context.rotate(-0.5 * Math.PI);
          context.translate(-width, 0);
          break;
      }
      if (orientation > 4) {
        context.drawImage(image, 0, 0, canvas.height, canvas.width);
      } else {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
      return canvas;
    };
  },
  canvasToBase64: (canvas, quality = 0.75) => {
    // in order to compress the final image format has to be jpeg
    const base64 = canvas.toDataURL("image/jpeg", quality);
    return base64;
  },

  // const canvasToImage = (canvas, quality=.75, mimeType='image/jpeg') => {
  //   const image = new Image()
  //   const base64str = canvas.toDataURL(mimeType, quality)
  //   image.src = base64str
  //   return image
  // }

  size: (size) => {
    return {
      KB: size / 1000,
      MB: size / (1000 * 1000)
    };
  }
};

const File = {
  load: (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new window.FileReader();
      fileReader.addEventListener(
        "load",
        (evt) => {
          resolve(evt.target.result);
        },
        false
      );

      fileReader.addEventListener(
        "error",
        (err) => {
          reject(err);
        },
        false
      );

      fileReader.readAsDataURL(file);
    });
  }
};

const Image = {
  load: (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.addEventListener(
        "load",
        () => {
          resolve(img);
        },
        false
      );

      img.addEventListener(
        "error",
        (err) => {
          reject(err);
        },
        false
      );

      img.src = src;
    });
  },
  /*
   * Resize the image based on the given height or width boundary.
   * Auto resize based on aspect ratio.
   **/
  resize: (targetWidth, targetHeight) => {
    return (width, height) => {
      if (!targetWidth && !targetHeight) return { width, height };

      const originalAspectRatio = width / height;
      const targetAspectRatio = targetWidth / targetHeight;

      let outputWidth, outputHeight;

      if (originalAspectRatio > targetAspectRatio) {
        outputWidth = Math.min(width, targetWidth);
        outputHeight = outputWidth / originalAspectRatio;
      } else {
        outputHeight = Math.min(height, targetHeight);
        outputWidth = outputHeight * originalAspectRatio;
      }

      return { width: outputWidth, height: outputHeight };
    };
  }
};

// The photo model
class Photo {
  constructor({
    quality = 0.75,
    size = 2,
    maxWidth = 1920,
    maxHeight = 1920,
    resize = true
  }) {
    this.start = window.performance.now();
    this.end = null;

    this.alt = null;
    this.ext = null;
    this.startSize = null;
    this.startWidth = null;
    this.startHeight = null;
    // How much will the quality decrease by each compression
    // this.stepQuality = stepQuality

    // size in MB
    this.size = size * 1000 * 1000;
    this.endSize = null;
    this.endWidth = null;
    this.endHeight = null;
    this.iterations = 0;
    this.base64prefix = null;
    // Carry out image resizing
    this.quality = quality;
    this.resize = resize;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.orientation = 1;
  }
}

// https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images/31273162#31273162

const Rotate = {
  orientation: (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = function(event) {
        var view = new DataView(event.target.result);

        if (view.getUint16(0, false) !== 0xffd8) {
          resolve(-2);
        }
        const length = view.byteLength;
        let offset = 2;

        while (offset < length) {
          const marker = view.getUint16(offset, false);
          offset += 2;

          if (marker === 0xffe1) {
            if (view.getUint32((offset += 2), false) !== 0x45786966) {
              resolve(-1);
            }
            const little = view.getUint16((offset += 6), false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;

            for (let i = 0; i < tags; i++) {
              if (view.getUint16(offset + i * 12, little) === 0x0112) {
                resolve(view.getUint16(offset + i * 12 + 8, little));
              }
            }
          } else if ((marker & 0xff00) !== 0xff00) break;
          else offset += view.getUint16(offset, false);
        }
        resolve(-1);
      };
      reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    });
  }
};

class Compress {
  attach(el, options) {
    return new Promise((resolve) => {
      const input = document.querySelector(el);
      input.setAttribute("accept", "image/*");
      input.addEventListener(
        "change",
        (evt) => {
          const output = this.compress([...evt.target.files], options);
          resolve(output);
        },
        false
      );
    });
  }

  compress(files, options) {
    function compressFile(file, options) {
      // Create a new photo object
      const photo = new Photo(options);
      photo.start = window.performance.now();
      photo.alt = file.name;
      photo.ext = file.type;
      photo.startSize = file.size;

      return Rotate.orientation(file)
        .then((orientation) => {
          photo.orientation = orientation;
          return File.load(file);
        })
        .then(compressImage(photo));
    }
    function compressImage(photo) {
      return (src) => {
        return Image.load(src)
          .then((img) => {
            // Store the initial dimensions
            photo.startWidth = img.naturalWidth;
            photo.startHeight = img.naturalHeight;
            // Resize the image
            if (photo.resize) {
              const { width, height } = Image.resize(
                photo.maxWidth,
                photo.maxHeight
              )(img.naturalWidth, img.naturalHeight);
              photo.endWidth = width;
              photo.endHeight = height;
            } else {
              photo.endWidth = img.naturalWidth;
              photo.endHeight = img.naturalHeight;
            }
            return Converter.imageToCanvas(
              photo.endWidth,
              photo.endHeight,
              photo.orientation
            )(img);
          })
          .then((canvas) => {
            photo.iterations = 1;
            // Base64.mime(Converter.canvasToBase64(canvas))
            photo.base64prefix = Base64.prefix(photo.ext);
            return loopCompression(
              canvas,
              photo.startSize,
              photo.quality,
              photo.size,
              photo.minQuality,
              photo.iterations
            );
          })
          .then((base64) => {
            photo.finalSize = Base64.size(base64);
            return Base64.data(base64);
          })
          .then((data) => {
            photo.end = window.performance.now();
            const difference = photo.end - photo.start; // in ms

            return {
              data: data,
              prefix: photo.base64prefix,
              elapsedTimeInSeconds: difference / 1000, // in seconds
              alt: photo.alt,
              initialSizeInMb: Converter.size(photo.startSize).MB,
              endSizeInMb: Converter.size(photo.finalSize).MB,
              ext: photo.ext,
              quality: photo.quality,
              endWidthInPx: photo.endWidth,
              endHeightInPx: photo.endHeight,
              initialWidthInPx: photo.startWidth,
              initialHeightInPx: photo.startHeight,
              sizeReducedInPercent:
                ((photo.startSize - photo.finalSize) / photo.startSize) * 100,
              iterations: photo.iterations
            };
          });
      };
    }
    function loopCompression(
      canvas,
      size,
      quality = 1,
      targetSize,
      targetQuality = 1,
      iterations
    ) {
      const base64str = Converter.canvasToBase64(canvas, quality);
      const newSize = Base64.size(base64str);
      // const base64str = convertCanvasToBase64(src)
      // const size = getFileSize(base64str);
      iterations += 1;
      // add in iteration count
      if (newSize > targetSize) {
        return loopCompression(
          canvas,
          newSize,
          quality - 0.1,
          targetSize,
          targetQuality,
          iterations
        );
      }

      if (quality > targetQuality) {
        return loopCompression(
          canvas,
          newSize,
          quality - 0.1,
          targetSize,
          targetQuality,
          iterations
        );
      }

      if (quality < 0.5) {
        return base64str;
      }
      return base64str;
    }

    return Promise.all(
      [...files].map((file) => {
        return compressFile(file, options);
      })
    );
  }
  static convertBase64ToFile(base64, mime) {
    return Converter.base64ToFile(base64, mime);
  }
}

/**
 * Comprimir imagenes
 * @param files: Files
 * @param options: Object
 */
function compressToUpload(files, options) {
  return new Promise((resolve) => {
    new Compress().compress(files, options).then((data) => {
      resolve(
        data.map(function(file) {
          const byteString = window.atob(file.data);
          const content = [];
          for (let i = 0; i < byteString.length; i++) {
            content[i] = byteString.charCodeAt(i);
          }
          return new window.File([new Uint8Array(content)], file.alt, {
            type: file.ext
          });
        })
      );
    });
  });
}

const defaultCompressOptions = {
  size: 4, // the max size in MB, defaults to 2MB
  quality: 0.75, // the quality of the image, max is 1,
  maxWidth: 800, // the max width of the output image, defaults to 1920px
  maxHeight: 800, // the max height of the output image, defaults to 1920px
  resize: true // defaults to true, set false if you do not want to resize the image width and height
};

export { compressToUpload, defaultCompressOptions };

// Supported input formats
// image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/x-icon,  image/svg+xml, image/webp, image/xxx
// image/png, image/jpeg, image/webp
// export { compress };
// export default compress;
