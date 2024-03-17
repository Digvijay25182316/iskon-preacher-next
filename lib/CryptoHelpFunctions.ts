import { AUTH_SECRET } from "@/lib/ENVHelp";
import crypto from "crypto";

// Encryption key (should be kept secret)
const encryptionKey: any = AUTH_SECRET;

// Function to create a hash of a string
export function createHash(data: string): string {
  // Create a hash object using SHA-256 algorithm
  const hash = crypto.createHash("sha256");

  // Update the hash object with the data
  hash.update(data);

  // Generate the hash value in hexadecimal format
  const hashedData = hash.digest("hex");

  return hashedData;
}

// Function to encrypt session token
export function encryptSessionToken(token: string): string {
  const iv = crypto.randomBytes(16); // Initialization vector (random bytes)
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let encryptedToken = cipher.update(token, "utf8", "hex");
  encryptedToken += cipher.final("hex");
  return iv.toString("hex") + encryptedToken;
}

// Function to decrypt session token
export function decryptSessionToken(encryptedToken: string): string {
  const iv = Buffer.from(encryptedToken.slice(0, 32), "hex"); // Extract initialization vector from the encrypted token
  const encryptedData = encryptedToken.slice(32); // Extract encrypted data (after the IV)
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(encryptionKey),
    iv
  );
  let decryptedToken = decipher.update(encryptedData, "hex", "utf8");
  decryptedToken += decipher.final("utf8");
  return decryptedToken;
}
