import { AccessLevel } from '@appository/backend/data-access';
import errorMessages from "../../../../../../shared-features/reports/src/error-messages";
import { checkFreeAccess, verifyEnterpriseUser, verifyPremiumAccess, verifyStandardAccess } from '../../../level-access-permissions';
import { getUserId } from '../../../utils/backend-auth.utils';

const accessLevel: string = 'free'

const isAccessLevel = (
  searchElement: AccessLevel,
  fromIndex: any,
  level: string,
  o: { [subset: string]: AccessLevel } | ArrayLike<AccessLevel>
): boolean => {
  console.log( `${getUserId} has ${level} level access`)
  return Object.values(o).includes(searchElement, fromIndex)
}

// Use the custom type guard
if (isAccessLevel({} as AccessLevel, 'search-element', 'index', [])) {
  let baseUrl: string

  switch (accessLevel) {
    case 'free':
      baseUrl = checkFreeAccess()
        ? 'free'
        : 'default'
        break
    case 'standard':
      baseUrl = verifyStandardAccess()
          ? 'standard'
          : 'default'
      break
    case 'premium':
      baseUrl = verifyPremiumAccess()
        ? 'premium'
        : 'default'
      break
    case 'enterprise':
      baseUrl = verifyEnterpriseUser()
          ? 'enterprise'
          : 'default'
      break
    default:
      throw new Error(errorMessages.NoUrlAccess)
  }
} else {
  throw new Error(errorMessages.NoUrlAccess)
}
