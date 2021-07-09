export const Logout = () => {
  sessionStorage.clear();
  window.location.href = "/login";
};
