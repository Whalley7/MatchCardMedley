export function getStoredScores() {
  const scores = localStorage.getItem("scores");
  return scores ? JSON.parse(scores) : {};
}



export function updateStoredScores(username, level, newScore) {
  const scores = getStoredScores();

  if (!scores[username]) {
    scores[username] = {};
  }

  const previousScore = scores[username][level] || 0;

  if (newScore > previousScore) {
    scores[username][level] = newScore;
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  return previousScore;
}


