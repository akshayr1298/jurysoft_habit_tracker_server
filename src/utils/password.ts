import * as bcrypt from "bcrypt";

//* hashing the password
export const hashPassword = async (password: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
//* campare the password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<Boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
