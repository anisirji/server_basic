function generateOrderID(lastOrderId, prefix, suffix = "") {
  if (lastOrderId === undefined) {
    lastOrderId = 0; // Define the first order ID as 0
  } else {
    // Extract the numeric part of the last order ID and increment it
    const lastOrderNumericPart = lastOrderId.match(/\d+/);
    lastOrderId = lastOrderNumericPart
      ? parseInt(lastOrderNumericPart[0]) + 1
      : 0;
  }

  lastOrderId = lastOrderId < 1 ? 1 : lastOrderId; // Ensure the minimum value is 1

  const formattedOrderId = `${prefix}-${String(lastOrderId).padStart(
    7,
    "0"
  )}-${suffix}`;
  return formattedOrderId;
  // You can save the last order ID to a database to ensure uniqueness across server restarts.
  // For simplicity, we'll keep it in memory.
}

console.log(generateOrderID(undefined, "ORDER-"));
console.log(generateOrderID(undefined, "ORDER-", "-Prefix"));
console.log(generateOrderID("ORDER-00001-SOMETHING", "ORDER-"));

module.exports = { generateOrderID };
