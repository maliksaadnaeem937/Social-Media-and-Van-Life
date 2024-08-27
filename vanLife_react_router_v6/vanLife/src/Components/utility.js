export const requireAuth = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true; 
  
        if (success) {
          resolve(true);
        } else {
          reject("Operation failed after delay.");
        }
      }, 100); 
    });
  };