/**
 * Find the greatest position in an array of contents.
 * @param {Array} contentsData - The array of content objects with a 'position' field.
 * @returns {number|null} - The greatest position or null if the array is empty.
 */
export const findGreatestPosition = (contentsData) => {
    if (contentsData.length === 0) return null; // Check if the array is empty
    
    const greatestPosition = contentsData.reduce((max, content) => {
      return content.position > max ? content.position : max;
    }, -Infinity); // Start with -Infinity to ensure any value is larger
    
    return greatestPosition;
};
