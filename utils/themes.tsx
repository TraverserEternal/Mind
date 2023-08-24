type Theme = {
  textColor: string;
  backgroundColor: string;
  buttonTextColor: string;
  buttonBackgroundColor: string;
  secondaryTextColor: string;
  isDark: boolean;
};

const purpleDarkMode: Theme = {
  textColor: "#CF9AD6",
  backgroundColor: "#211B22",
  secondaryTextColor: "#876E87",
  buttonBackgroundColor: "#CF9AD6",
  buttonTextColor: "#211B22",
  isDark: false,
};

const purpleLightMode: Theme = {
  textColor: "#211B22",
  backgroundColor: "#F6F4F6",
  secondaryTextColor: "#DAD2DB",
  buttonBackgroundColor: "#8A3792",
  buttonTextColor: "#F6F4F6",
  isDark: true,
};

export const theme: Theme = purpleDarkMode;
