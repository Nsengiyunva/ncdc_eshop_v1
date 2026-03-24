export const slugify = (text) => {
  // remove html tags from string
  const content = text.replace(/<[^>]*>?/gm, '');
  const result = content.split('-')[0];
  return result;
};
