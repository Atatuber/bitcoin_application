export const getHeaderName = (location) => {
  const path = location.pathname;
  switch (path) {
    case "/":
      return "Home";
    case "/wallets/add":
      return "Add wallet";
    case "/login":
      return "Login";
    case "/transactions/add":
      return "Create transaction";
    case "/transactions":
      return "Transactions";
    default:
      return "ChainVault";
  }
};
