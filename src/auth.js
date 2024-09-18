const logout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('userId'); // Remove the user ID from local storage
    // Optionally, you can redirect the user to the login page or home page
    window.location.href = '/login'; // Redirect to login
};
  
export { logout };