export class IMAGECOMPRESS {

    constructor(file) {
        this.file = file

    }

    formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';

        const sizes = ['bytes', 'kb', 'mb', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const formattedSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
        return formattedSize;
    }

    compress = async () => {
        try {
            const maxSizeInBytes = 1024 * 1024; // 1MB
            const quality = 0.7
            const mimeType = this.file.type; // Get MIME type from the file
            if (this.file.size > maxSizeInBytes) {
                if (this.file && this.file.type === 'image/png') {
                    this.file = await this.convertPngToJpeg(this.file, quality);
                    console.log('Converted JPEG file:', this.file);
                    return this.file
                }
                if (this.file && this.file.type === 'image/jpeg') {
                    this.file = await this.compressImageToMaxSize(this.file, mimeType, maxSizeInBytes, quality);
                    console.log('Compressed file:', this.file);
                    return this.file
                }
            }
            return this.file
    }catch(error){
        console.log(error)
    }
}

    /**
     * Convert a PNG image File object to a JPEG File object.
     * @param {File} pngFile - The PNG image File object to convert.
     * @param {number} quality - The desired quality of the JPEG image (0 to 1).
     * @returns {Promise<File>} A Promise that resolves with the converted JPEG File object.
     */
    convertPngToJpeg = (pngFile, quality = 0.7) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Set canvas dimensions to match image size
                    canvas.width = image.width;
                    canvas.height = image.height;

                    // Draw PNG image on canvas
                    ctx.drawImage(image, 0, 0);

                    // Convert canvas to JPEG blob
                    canvas.toBlob((blob) => {
                        if (!blob) {
                            reject(new Error('Failed to convert PNG to JPEG.'));
                            return;
                        }

                        // Create a File object with the JPEG blob
                        const jpegFileName = pngFile.name.replace(/\.[^.]+$/, '.jpg'); // Replace extension with .jpg
                        const jpegFile = new File([blob], jpegFileName, {
                            type: 'image/jpeg',
                            //lastModified: Date.now(),
                        });

                        resolve(jpegFile);
                    }, 'image/jpeg', quality);
                };
                image.src = event.target.result;
            };
            reader.onerror = (error) => {
                reject(error);
            };

            // Read the PNG file as data URL
            reader.readAsDataURL(pngFile);
        });
    }

    /**
     * Compresses an image file to be smaller than a specified size limit (in bytes).
     * @param {File} file - The image File object to compress.
     * @param {number} maxSizeInBytes - The maximum allowed size (in bytes) for the compressed image.
     * @param {number} quality - The desired quality of the compressed image (0 to 1).
     * @param {string} mimeType - The MIME type of the compressed image (e.g., 'image/jpeg', 'image/png').
     * @returns {Promise<File>} A Promise that resolves with the compressed File object.
     */
    compressImageToMaxSize = (file, mimeType = 'image/jpeg', maxSizeInBytes = 1024 * 1024, quality = 0.7) => {
        console.log(mimeType)
        return new Promise((resolve, reject) => {

            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    // Set canvas dimensions to match image size
                    canvas.width = image.width;
                    canvas.height = image.height;
                    // Draw image on canvas
                    ctx.drawImage(image, 0, 0);
                    let compressedFile;
                    const initialQuality = quality;
                    const step = 0.1;
                    const blobToCheck = (q) => new Promise((resolve, reject) => {
                        canvas.toBlob((blob) => {
                            if (blob.size < maxSizeInBytes) {
                                compressedFile = new File([blob], file.name, {
                                    type: mimeType,
                                    lastModified: Date.now(),
                                });
                                resolve(compressedFile);
                            } else if (q <= 0) {
                                reject(new Error('Cannot compress image to desired size.'));
                            } else {
                                quality = q - step;
                                blobToCheck(quality)
                                    .then(resolve)
                                    .catch(reject);
                            }
                        }, mimeType, q);
                    });

                    blobToCheck(initialQuality)
                        .then(resolve)
                        .catch(reject);
                };
                image.src = event.target.result;
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }
}