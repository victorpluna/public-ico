export const validateRequired = (value: string) => {
  let error;
  if (!value) {
    error = "This field is required";
  }
  return error;
};

export const validateURL = (value: string) => {
  let error;
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/i;
  if (!value) {
    error = "URL is required";
  } else if (!urlPattern.test(value)) {
    error = "Invalid URL";
  }
  return error;
};
