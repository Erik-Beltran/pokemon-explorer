export const formatHeight = (height: number) => {
  const meters = height / 10;

  return `${meters} m`;
};

export const formatWeight = (weight: number): string => {
  const kg = weight / 10;
  return `${kg} kg`;
};
