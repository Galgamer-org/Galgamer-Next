const IMAGE_PREFIX = "https://storage-zone1.galgamer.moe/draw-guess/";
const IMAGE_FORMAT = "webp";


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
  
    getURL = () => {
      const extention = this._filename.split('.').pop();
      const filename = this._filename.replace(`.${extention}`, '');
      const path = encodeURIComponent(filename);
      return `${IMAGE_PREFIX}${path}.${IMAGE_FORMAT}`;
    }
  };

export default ImageData;