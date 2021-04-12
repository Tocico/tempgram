import imageCompression from 'browser-image-compression'

export default {
  async getCompressImageFile(file) {
    const options = {
      maxSizeMB: 0.8, 
      maxWidthOrHeight: 600, 
    }
    return await imageCompression(file, options)
  },
}