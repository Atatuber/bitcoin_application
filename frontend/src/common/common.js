export function hasErrors(formData, setErrors, validateField) {
  return Object.keys(formData).some((key) => {
    const error = validateField(key, formData[key]);
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
    }
    return !!error;
  });
}

export function formatMessage({ address, amount, fee, role }) {
  const formattedAmount = amount > 0 ? amount : 0;
  const formattedFee = fee > 0 ? fee : 0;

  if (role === "sender") {
    return {
      title: address ? address : "Your BTC address",
      description: `sends ${formattedAmount} BTC with ${formattedFee} BTC transction costs.`,
    };
  } else if (role === "recipient") {
    return {
      title: address ? address : "Receiver BTC address",
      description: `gets ${formattedAmount} BTC.`,
    };
  }
  return null;
}

const calculateFee = (option) => {
  const satoshisPerBTC = 100000000;
  const feeRates = {
    slow: 1, // Low priority (e.g., 1 satoshi/byte)
    normal: 5, // Medium priority (e.g., 5 satoshis/byte)
    fast: 10, // High priority (e.g., 10 satoshis/byte)
  };

  const averageTxSize = 250;

  const feeRate = feeRates[option] || feeRates.normal;
  const feeInSatoshis = feeRate * averageTxSize;

  const feeInBTC = feeInSatoshis / satoshisPerBTC;

  return feeInBTC;
};

export const getFeeForOption = (option) => {
  switch (option) {
    case "slow":
      return calculateFee("slow");
    case "normal":
      return calculateFee("normal");
    case "fast":
      return calculateFee("fast");
    default:
      return calculateFee("normal");
  }
};
