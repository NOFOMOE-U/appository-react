type AcceptsFunction = (type: string | string[]) => string | string[] | false;
type NoArgsFunction = () => string[] | false;

export function accepts(types: string | string[] | undefined): AcceptsFunction | NoArgsFunction {
  if (typeof types === 'string') {
    // Handle the case when a single type is provided
    return (type: string | string[]) => {
      if (typeof type === 'string') {
        return type === types ? type : false;
      }
      return false;
    };
  } else if (Array.isArray(types)) {
    // Handle the case when an array of types is provided
    return (type: string | string[]) => {
      if (Array.isArray(type)) {
        return types.includes(type[0]) ? type : false;
      }
      return false;
    };
  } else {
    // Handle other cases or return an array of accepted types
    return () => false as string[] | false;
  }
}
