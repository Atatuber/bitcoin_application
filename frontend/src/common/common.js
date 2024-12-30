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
      title: address ? address : "Jouw BTC adres",
      description: `stuurt ${formattedAmount} BTC met ${formattedFee} BTC aan transactiekosten.`,
    };
  } else if (role === "recipient") {
    return {
      title: address ? address : "Ontvanger BTC adres",
      description: `ontvangt ${formattedAmount} BTC.`,
    };
  }
  return null;
}

export const calculateFee = (amount) => {
  const minimumFee = 0.00001;
  const maximumFee = 0.001;
  const feePercentage = 0.001;

  let fee = amount * feePercentage;

  if (fee < minimumFee) {
    fee = minimumFee;
  } else if (fee > maximumFee) {
    fee = maximumFee;
  }

  return fee;
};
