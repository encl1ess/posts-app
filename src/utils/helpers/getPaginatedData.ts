export const getMaxPage = (length: number, offset: number) => {
  return Math.ceil(length / offset);
};

export const getPaginatedData = <T>(
  data: T[],
  page: number,
  offset: number,
): T[] => {
  return data.slice((page - 1) * offset, page * offset);
};
