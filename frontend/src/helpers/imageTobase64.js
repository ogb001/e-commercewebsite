const imageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result); // Resolve the promise with the Base64 encoded image
        };

        reader.onerror = (error) => {
            reject(error); // Reject the promise if an error occurs
        };

        reader.readAsDataURL(image); // Read the image as a Base64 data URL
    });
};

export default imageToBase64;