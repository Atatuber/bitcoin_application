export const getHeaderName = (location) => {
  const path = location.pathname;
  switch (path) {
    case "/":
      return "Home";
    case "/wallets/add":
      return "Wallet toevoegen";
    case "/login":
      return "Inloggen";
    default:
      return "ChainVault";
  }
};
