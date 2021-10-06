export const getUserPos = async () => {
    return new Promise((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(
            (pos) => {
                resolve([pos.coords.longitude, pos.coords.latitude]);
            },
            (e) => reject(e)
        );
    });
};
