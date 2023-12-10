const timeToDecimal = (time) => {
  const arr = time.split(":");

  const dec = parseInt((arr[1] / 6) * 10, 10);

  const result = parseFloat(
    parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec
  );

  return result;
};

export default timeToDecimal;
