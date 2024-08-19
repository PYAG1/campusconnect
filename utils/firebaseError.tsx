const normalizeFirebaseErrorMessage = (errorCode: string) => {
    const errorMessages = {
      "auth/invalid-email":
        "The email address is not valid. Please enter a valid email.",
      "auth/operation-not-allowed":
        "Email/password accounts are not enabled. Please contact support.",
      "auth/weak-password": "The password is too weak. Please choose a stronger password.",
      "auth/user-disabled":
        "This user account has been disabled. Please contact support.",
      "auth/user-not-found":
        "No user found with this email. Please check and try again.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-credential": "Invalid credentials. Please try again.",
      "auth/email-already-in-use": "This email is already in use.",
    };
  
    if (errorCode in errorMessages) {
      return errorMessages[errorCode as keyof typeof errorMessages];
    }
  
    return "An unexpected error occurred. Please try again.";
  };
  
  export default normalizeFirebaseErrorMessage;
  