export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    const result = isoString.split('T')[0]
    return result;
}