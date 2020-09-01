export function saveAuth(auth) {
  localStorage.setItem('auth', JSON.stringify(auth))
}
export function getAuth() {
  return JSON.parse(localStorage.getItem('auth'))
}