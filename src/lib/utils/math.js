export function getRandomNumber(max) {
  let no = Math.random();
  no = Math.round((no * 10) % max);
  return no;
}

export function getNextRoundRobin(current, total) {
  const nextNum = (current + 1) % total;
  return nextNum;
}
