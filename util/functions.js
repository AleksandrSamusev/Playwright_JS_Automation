export function generateName() {
  var date = new Date();
  var dt = date.getTime();
  return `testUser` + dt;
}

export function generateEmailAddress() {

  return generateName() + '@test.com';
}

export function generatePassword() {
  var date = new Date();
  var dt = date.getTime();
  return `!A` + dt + `a`;
}
