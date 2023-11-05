import crypto from 'crypto';

export function generateRandomHash() {
    const length = 64; // You can adjust the length of the hash
    return crypto.randomBytes(length).toString('hex');
  }
  


// Function to create a chained hash based on the previous hash, random value, and other data
export function chainHash(previousHash: string, randomValue: string, otherData: string): string {
  const combinedData = previousHash + randomValue + otherData;
  return crypto
    .createHash('sha256') // You can use a different hashing algorithm if needed
    .update(combinedData)
    .digest('hex');
}

// Example usage:
const previousHash = 'previous_hash'; // Replace with the previous hash from the user
const randomValue = generateRandomHash(); // Generate a random value
const otherData = 'some_other_data'; // Include any additional data for chaining

const newHash = chainHash(previousHash, randomValue, otherData);

console.log('Random Value:', randomValue);
console.log('New Chained Hash:', newHash);