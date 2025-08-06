// modals.js

// Show a Bootstrap modal by ID
export function showModal(id) {
  const modalEl = document.getElementById(id);
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

// Hide a Bootstrap modal by ID
export function hideModal(id) {
  const modalEl = document.getElementById(id);
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}

// Show Win Modal with custom message
export function showWinModal(username, level, score) {
  document.getElementById("winModalLabel").textContent = `🎉 You Won!`;
  document.querySelector("#winModal .modal-body p").textContent =
    `Congratulations ${username}! You scored ${score} on ${level} level.`;
  showModal("winModal");
}

// Show Loss Modal with custom message
export function showLossModal(username, level, newScore, oldScore) {
  // Ensure elements exist before updating them
  const title = document.getElementById("lostModalLabel");
  const body = document.getElementById("lostModalBody");

  if (title && body) {
    title.textContent = `Bad luck, ${username}!`;
    body.textContent = `Your score of ${newScore} did not beat your high score of ${oldScore} on ${level} level.`;
    showModal("lossModal");
  }
}

// Bind all modal events (close buttons and user name submission)
export function bindModalEvents(game) {
  // Close all modals when buttons with class 'close-modal' are clicked
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      ['winModal', 'lossModal', 'userModal'].forEach(id => {
        const modal = bootstrap.Modal.getInstance(document.getElementById(id));
        if (modal) modal.hide();
      });
    });
  });

  // Handle user name submission
  const submitBtn = document.getElementById("submitUsername");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const usernameInput = document.getElementById("usernameInput").value.trim();
      if (usernameInput) {
        game.username = usernameInput;
        localStorage.setItem("username", game.username);
        document.getElementById("player").textContent = `Hi ${game.username}!`;
        hideModal("userModal");
        game.displayUserScore();
      }
    });
  }

  // Optional: handle play again button in win modal
  const playAgainBtn = document.getElementById("play-again-btn");
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
      hideModal("winModal");
      game.shuffleDeck();
    });
  }
}
