export interface MapRangeOptions {
  inputValue: number;
  outputMin: number;
  outputMax: number;
  inputMax: number;
  inputMin: number;
}

export function mapRange(options: MapRangeOptions) {
  const {inputValue, outputMin, outputMax, inputMax, inputMin} = options;
  const result =
    ((inputValue - inputMin) * (outputMax - outputMin)) /
      (inputMax - inputMin) +
    outputMin;

  if (result === Infinity) return 0;

  return result;
}
