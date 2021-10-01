export const calculateDistance = (posA, posB) => {
    // Check input data
    // Expected input value [number, number]
    if (!Array.isArray(posA) || !Array.isArray(posB) || isNaN(posA[0]) || isNaN(posA[1]) || isNaN(posB[0]) || isNaN(posB[1])) throw new TypeError("Incorrect argument type");
    const distanceX = posA[0] - posB[0];
    const distanceY = posA[1] - posB[1];
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
};
