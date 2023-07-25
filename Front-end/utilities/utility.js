export function hasAccessToken() {
  // Comprobar si el código se está ejecutando en el lado del cliente antes de acceder a localStorage
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") !== null;
  }
  return false;
}
