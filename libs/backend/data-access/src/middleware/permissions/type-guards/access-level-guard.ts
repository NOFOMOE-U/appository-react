import errorMessages from "../error-messages";
import { checkFreeAccess } from '../../../level-access-permissions';
import { AccessLevel } from "../../../interfaces/auth/access-level";

 // Custom type guard to ensure that this.accessLevel is a valid key
 const isAccessLevel = (level: string): level is AccessLevel => {
  return Object.values(AccessLevel).includes(level as unknown as  AccessLevel);
};

// Use the custom type guard
if (isAccessLevel(this.accessLevel)) {
  let baseUrl: string;

  switch (this.accessLevel) {
    case AccessLevel.FREE:
      baseUrl = this.checkFreeAccess() ? 'free' : 'default';
      break;
    case AccessLevel.STANDARD:
      baseUrl = this.verifyStandardAccess() ? 'standard' : 'default';
      break;
    case AccessLevel.PREMIUM:
      baseUrl = this.verifyPremiumAccess() ? 'premium' : 'default';
      break;
    case AccessLevel.ENTERPRISE:
      baseUrl = this.authenticateEnterpriseUser() ? 'enterprise' : 'default';
      break;
    default:
      throw new Error(errorMessages.NoUrlAccess);
  }

  return baseUrl;
} else {
  throw new Error(errorMessages.NoUrlAccess);
}
