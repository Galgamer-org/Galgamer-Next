const IMAGE_PREFIX = "https://storage-zone1.galgamer.moe/draw-guess/";
const IMAGE_FORMAT = "webp";
const NEW_IMAGE_PREFIX = "https://storage-zone1.galgamer.moe/draw-guess-output/";
// in 480, 1280, 2560 subfolders

type ImageUrls = {
  _480url: string,
  _1280url: string,
  _2560url: string,
}

class ImageData  {
    _author: string
    _created_time: number
    _created_time_readable: string
    _draw_what: string
    _filename: string
    _hash: string
    _height: number
    _size: number
    _width: number

    getURL = function (): ImageUrls {
      const extention = this._filename.split('.').pop();
      const filename = this._filename.replace(`.${extention}`, '');
      const path = encodeURIComponent(filename);
      return {
        _480url: `${NEW_IMAGE_PREFIX}480/[480]${path}.${IMAGE_FORMAT}`,
        _1280url: `${NEW_IMAGE_PREFIX}1280/[1280]${path}.${IMAGE_FORMAT}`,
        _2560url: `${NEW_IMAGE_PREFIX}2560/[2560]${path}.${IMAGE_FORMAT}`,
      }
    }
  };

export default ImageData;