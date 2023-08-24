import * as FileSystem from "expo-file-system";

//Journal
export const JOURNAL_DATA_DIRECTORY =
  FileSystem.documentDirectory + "journalData/";
export const JOURNAL_METADATA_DIRECTORY =
  FileSystem.documentDirectory + "metadata/";
export const METADATA_FILE_PATH = JOURNAL_METADATA_DIRECTORY + "metadata.json";
export const PASSWORD = "somepassword";

//Encryption
export const ENCRYPTION_DIRECTORY =
  FileSystem.documentDirectory + "encryption/";
export const ENCRYPTED_PASSWORD_CHECK_LOCATION =
  ENCRYPTION_DIRECTORY + "encryptedPasswordCheck";

export const SALT_LOCATION = ENCRYPTION_DIRECTORY + "salt";
export const PASSWORD_CHECK = "14gS2tck7oHAnasznXYY8Ad7sH22qcr0";
