export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const createSleep = () => {
  let timeout: NodeJS.Timeout;

  return (ms) =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(resolve, ms);
    });
};
