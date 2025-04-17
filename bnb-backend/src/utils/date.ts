export const timeFromNow = (
  timeFrame: "m" | "h" | "d" | "mo" | "y",
  value: number,
  ago?: boolean | string
): Date => {
  // Sets a date based on the inputs
  const now = Date.now();
  const isItPast: boolean = !!ago || false;

  switch (timeFrame) {
    case "m":
      return isItPast
        ? new Date(now - value * 60 * 1000)
        : new Date(now + value * 60 * 1000);

    case "h":
      return isItPast
        ? new Date(now - value * 60 * 60 * 1000)
        : new Date(now + value * 60 * 60 * 1000);
    case "d":
      return isItPast
        ? new Date(now - value * 24 * 60 * 60 * 1000)
        : new Date(now + value * 24 * 60 * 60 * 1000);
    case "mo":
      return isItPast
        ? new Date(now - value * 30 * 24 * 60 * 60 * 1000)
        : new Date(now + value * 30 * 24 * 60 * 60 * 1000);
    case "y":
      return isItPast
        ? new Date(now - value * 12 * 30 * 24 * 60 * 60 * 1000)
        : new Date(now + value * 12 * 30 * 24 * 60 * 60 * 1000);

    default:
      return new Date(now);
  }
};
