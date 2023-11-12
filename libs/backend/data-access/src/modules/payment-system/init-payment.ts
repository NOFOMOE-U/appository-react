









// //todo front end code:
// function initPayment() {
//     if (window.PaymentRequest) {
//       // The Payment Request API is available
//       const paymentDetails = {
//         total: {
//           label: 'Total Cost',
//           amount: {
//             currency: 'USD',
//             value: 10.0, // The total amount to be charged
//           },
//         },
//         // Additional payment details as required
//       };
  
//       const paymentRequest = new PaymentRequest(
//         [{
//           supportedMethods: 'basic-card', // Method supported, e.g., 'basic-card', 'https://mymethod.com'
//           data: paymentDetails,
//         }],
//         {
//           // Options like shipping options, etc.
//         }
//       );
  
//       // Handle the payment request
//       paymentRequest.show()
//         .then(function(paymentResponse) {
//           // Handle payment response, e.g., process the payment on the backend
//           return fetch('/process-payment', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(paymentResponse),
//           });
//         })
//         .then(function(processedPayment) {
//           // Handle success/failure after processing payment on the server
//           console.log('Payment processed:', processedPayment);
//         })
//         .catch(function(error) {
//           // Handle errors during the payment request or processing
//           console.error('Payment failed:', error);
//         });
//     } else {
//       // Payment Request API is not available, redirect to a checkout page
//       window.location.href = '/checkout';
//     }
//   }
  