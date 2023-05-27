const formatNumber = (number: number) => {
  const locales = [undefined, "en-US", "hi-IN", "de-CH"];
  const opts = { minimumFractionDigits: 2 };
  for (let i = 0; i < locales.length; i++) {
    return locales[i], number.toLocaleString(locales[i], opts);
  }
};
export default formatNumber;
