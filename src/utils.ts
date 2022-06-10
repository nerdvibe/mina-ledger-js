/*
 * Validate a Mina address.
 */
export const isValidAddress = (address: string): boolean => {
  const regex = new RegExp("^B62q[i-s][A-HJ-NP-Za-km-z1-9]{50}$");

  return regex.test(address);
};
