
type Payment = {

}

type PaymentRequest = {
    paymentId: ''
    paymentDetails: Payment
    options?: ['']
}


export function getUserIdFromPayment(paymentId: string): string | null {
  // Logic to retrieve the user ID associated with the payment from your database or payment service
  // This can involve querying payment records to find the corresponding user ID

  // For example:
  // Replace this with your actual logic to fetch the user ID based on the payment ID
  if (paymentId === 'somePaymentId') {
    // This represents a user ID associated with a payment
    return 'userId123';
  }

  // If no user is found for the given payment, return null
  return null;
}






// // set up init payment:
// if (window.PaymentRequest) {
//   // Yes, we can use the API
// } else {
//   // No, fallback to the checkout page
//   window.location.href = '/checkout'
// }
// // this is going to be used on the front end to verify system integration

// // set up request payment api javascript