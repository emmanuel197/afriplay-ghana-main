const sizes = [
    {
        'big-low-quality': {
            'format': 'webp',
            'quality': .50,
            'size': 2
        }
    },
    {
        'small': {
            'format': 'webp',
            'quality': .82,
            'size': 1
        }
    },
    {
        'small-hd': {
            'format': 'jpeg',
            'quality': .85,
            'size': 1
        }
    },
]



export const waitForImage = (imgElem) => {
    return new Promise(res => {
        if (imgElem.complete) {
            return res();
        }
        imgElem.onload = () => res();
        imgElem.onerror = () => res();
    });
}

export const convertImage = async (original, format = 'webp', quality = .20, size = 1) => {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Use the intrinsic size of image in CSS pixels for the canvas element
    canvas.width = original.naturalWidth * size;
    canvas.height = original.naturalHeight * size;

    // To use the custom size we'll have to specify the scale parameters
    // using the element's width and height properties - lets draw one
    // on top in the corner:
    ctx.scale(size, size);
    ctx.drawImage(original, 0, 0);

    return canvas.toDataURL(`image/${format}`, quality);
};

(async () => {
    const screenWidth = Math.round(window.innerWidth * .5);

    const image = document.getElementById('original')
    image.src = `https://source.unsplash.com/random/${screenWidth}x${screenWidth}/`;
    await waitForImage(image);

    sizes.forEach((size) => {
        const options = Object.entries(size)[0][1];
        convertImage(image, options.format, options.quality, options.size)
            .then(imageSrc => {
                const generated = document.createElement("img");
                generated.id = Object.keys(size)[0];
                generated.src = imageSrc;
                document.getElementById('genwrap').append(generated);
            })
    })
})();