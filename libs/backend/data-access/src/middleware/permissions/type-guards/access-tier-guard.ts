import { AccessTier } from "../../../make-api/api-config/access-tier";

// Type guard function to check if a value is of type AccessTier
export function isAccessTier(value: any): value is AccessTier {
  return (
    value === 'free' ||
    value === 'standard' ||
    value === 'premium' ||
    value === 'enterprise'
  );
}
