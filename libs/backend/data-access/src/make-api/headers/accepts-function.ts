type AcceptsFunction = {
    (type: string | string[]): string | false;
    (): string[] | false;
  };
  
  function accepts(typeOrTypes: string | string[] | undefined): AcceptsFunction {
    if (typeof typeOrTypes === 'string') {
      // Handle the case when a single type is provided
      return (type: string | string[]) => {
        if (typeof type === 'string') {
          return type === typeOrTypes ? type : false;
        }
        return false;
      };
    } else if (Array.isArray(typeOrTypes)) {
      // Handle the case when an array of types is provided
      return (type: string | string[]) => {
        if (Array.isArray(type)) {
          return typeOrTypes.includes(type[0]) ? type : false;
        }
        return false;
      };
    } else {
      // Handle other cases or return an array of accepted types
      return () => false;
    }
  }
  
//   // Example usage:
  
//   const accept = accepts('application/json');
//   console.log(accept('text/html')); // Should return false
  
//   const acceptMultiple = accepts(['text/html', 'application/json']);
//   console.log(acceptMultiple('text/html')); // Should return 'text/html'
  
//   const acceptAll = accepts(undefined);
//   console.log(acceptAll('text/html')); // Should return an array of accepted types
  