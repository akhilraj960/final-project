export const shorttenText = (text, n) => {
  if (text.length > n) {
    const Text = text.substring(0, n).concat("...");
    return Text;
  }
  return text;
};
