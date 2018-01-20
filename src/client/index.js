export const sendBookingDetails = details => (
    new Promise((resolve, reject) => {
        // @TODO
        setTimeout(() => {
            resolve({
                status: 'success',
            });
        }, 1000);
    })
);