import { hashPassword, verifyPassword } from "./user-with-password-hash";

describe('hashPassword', () => {
  it('should hash a password', async () => {
    const password = 'password';
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toEqual(password);
  });


  describe('verifyPassword', () => {
    it('should verify a correct password', async () => {
      const password = 'password';
      const hashedPassword = await hashPassword(password);
      const result = await verifyPassword(password, hashedPassword);
      expect(result).toBe(true);
    });
  
    it('should not verify an incorrect password', async () => {
      const password = 'password';
      const hashedPassword = await hashPassword(password);
      const result = await verifyPassword('wrongpassword', hashedPassword);
      expect(result).toBe(false);
    });
  });
  
});
