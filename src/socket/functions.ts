export function clearSensibleData(user: any): any {
  if (user.email) {
    delete user.email;
  }
  if (user.id) {
    delete user.id;
  }
  if (user.password) {
    delete user.password;
  }
  return user;
}
