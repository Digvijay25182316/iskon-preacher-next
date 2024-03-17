"use server";

export const authenticate = async (e: FormData): Promise<void> => {
  const email = e.get("email")?.valueOf();
  const password = e.get("password")?.valueOf();
  try {
    if (!email || !password) {
      throw "please give the details";
    }
  } catch (error: any) {
    throw error.message || error.status;
  }
};
