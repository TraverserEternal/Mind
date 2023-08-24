import CryptoES from "crypto-es";
import * as FileSystem from "expo-file-system";
import {
  ENCRYPTED_PASSWORD_CHECK_LOCATION,
  ENCRYPTION_DIRECTORY,
  JOURNAL_DATA_DIRECTORY,
  METADATA_FILE_PATH,
  PASSWORD_CHECK,
  SALT_LOCATION,
} from "./constants";

const generateRandomSalt = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    salt += characters.charAt(randomIndex);
  }

  return salt;
};

export const setPassword = async (password: string): Promise<boolean> => {
  try {
    await FileSystem.makeDirectoryAsync(ENCRYPTION_DIRECTORY, {
      intermediates: true,
    });
    const generatedSalt = generateRandomSalt(50);
    await FileSystem.writeAsStringAsync(SALT_LOCATION, generatedSalt);

    const encryptedData = CryptoES.AES.encrypt(
      PASSWORD_CHECK,
      password + generatedSalt
    ).toString();

    await FileSystem.writeAsStringAsync(
      ENCRYPTED_PASSWORD_CHECK_LOCATION,
      encryptedData
    );

    return true; // Return true if successful
  } catch (error) {
    console.error("Error encrypting and saving data:", error);
    return false; // Return false if there's an error
  }
};

export const checkPassword = async (password: string): Promise<boolean> => {
  try {
    const encryptedPasswordCheck = await FileSystem.readAsStringAsync(
      ENCRYPTED_PASSWORD_CHECK_LOCATION
    );
    const salt = await FileSystem.readAsStringAsync(SALT_LOCATION);

    const decryptedData = CryptoES.AES.decrypt(
      encryptedPasswordCheck,
      password + salt
    ).toString(CryptoES.enc.Utf8);

    return decryptedData === PASSWORD_CHECK;
  } catch (error) {
    console.error("Error checking password:", error);
    return false;
  }
};

export const passwordExists = async () => {
  return await FileSystem.getInfoAsync(ENCRYPTED_PASSWORD_CHECK_LOCATION).then(
    (d) => d.exists
  );
};

export const resetAccount = async (): Promise<void> => {
  try {
    await FileSystem.deleteAsync(ENCRYPTED_PASSWORD_CHECK_LOCATION);
  } catch (e) {
    console.log(e);
  }
  try {
    await FileSystem.deleteAsync(SALT_LOCATION);
  } catch (e) {
    console.log(e);
  }
  const files = await FileSystem.readDirectoryAsync(JOURNAL_DATA_DIRECTORY);
  for (const file of files) {
    try {
      await FileSystem.deleteAsync(JOURNAL_DATA_DIRECTORY + file);
    } catch (e) {
      console.log(e);
    }
  }
  try {
    await FileSystem.deleteAsync(METADATA_FILE_PATH);
  } catch (e) {}

  console.log("Password files deleted successfully.");
};
