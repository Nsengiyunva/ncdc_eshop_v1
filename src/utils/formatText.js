export function formatText(text) {
    return text
    .replace(/[_-]/g, ' ')  // Replace underscores and hyphens with spaces
    .split(' ')  // Split by spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
