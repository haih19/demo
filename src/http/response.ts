export const response = async (response: Promise<unknown>) => {
  try {
    return await response;
  } catch (error) {
    return error;
  }
};
