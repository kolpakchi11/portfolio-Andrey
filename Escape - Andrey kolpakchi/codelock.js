// De juiste code: antwoorden puzzel 1,2,3,4 = 7,5,3,2
const CORRECT_CODE = '7532';
const digitInputs = Array.from(document.querySelectorAll('.code-digit'));

// Auto-focus en invoercontrole
digitInputs.forEach((input, i) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '').slice(-1);
    if (input.value && i < digitInputs.length - 1) {
      digitInputs[i + 1].focus();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && i > 0) {
      digitInputs[i - 1].focus();
    }
    if (e.key === 'Enter') {
      checkCode();
    }
  });
});

function clearAnswers() {
  for (let i = 1; i <= 4; i++) {
    localStorage.removeItem('answer' + i);
    document.getElementById('d' + i).value = '';
  }
}

function checkCode() {
  const enteredCode = digitInputs.map((input) => input.value).join('');
  const granted = document.getElementById('result-granted');
  const denied = document.getElementById('result-denied');
  const lockShell = document.querySelector('.lock-shell');

  granted.style.display = 'none';
  denied.style.display = 'none';
  lockShell.classList.remove('unlocked', 'shake');

  if (enteredCode.length !== 4) {
    denied.style.display = 'block';
    denied.querySelector('.result-title').textContent = 'ACCESS DENIED';
    denied.querySelector('p:nth-child(2)').textContent = '✗ Voer 4 cijfers in om door te gaan.';
    lockShell.classList.add('shake');
    return;
  }

  if (enteredCode === CORRECT_CODE) {
    lockShell.classList.add('unlocked');
    granted.style.display = 'block';
    granted.querySelector('.result-title').textContent = 'ACCESS GRANTED';
    granted.querySelector('p:nth-child(2)').textContent = '✓ Je hebt de code correct ingevoerd en de kluis geopend.';
  } else {
    lockShell.classList.add('shake');
    denied.style.display = 'block';
    denied.querySelector('.result-title').textContent = 'ACCESS DENIED';
    denied.querySelector('p:nth-child(2)').textContent = '✗ Verkeerde code. Probeer opnieuw.';
    setTimeout(() => {
      digitInputs.forEach((input) => input.value = '');
      digitInputs[0].focus();
    }, 400);
  }
}

