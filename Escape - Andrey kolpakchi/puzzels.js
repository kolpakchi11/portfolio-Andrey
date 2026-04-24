/*
  Antwoorden en uitleg:
  1 = 7  (0111₂ -> 7 decimaal)
  2 = 5  (fout op regel 5: moet "totaal = totaal + getal" zijn)
  3 = 3  (er zijn drie items in de skills array)
  4 = 2  (2 + 2 = 4, 4 - 2 = 2)

  Overgang naar volgende puzzel is gerepareerd.
  Alle juiste waarden worden opgeslagen in localStorage,
  zodat de codeslot later geopend kan worden.
*/

const answers = {};
let currentPuzzle = 1;

function check (num, correct) {
    const input = document.getElementById('ans'+ num);
    const fb = document.getElementById('fb'+ num);
    const value = parseInt(input.value, 10);
    if (value === correct) {
        input.classList.add('correct');
        input.classList.remove('incorrect');
        fb.textContent = 'Correct! Antwoord ' + num + ' = ' + correct;
        fb.className = 'feedback ok';
        answers[num] = correct;

        // sla op in localStorage voor codeslot
        localStorage.setItem('answer' + num, correct);
        setTimeout(() => nextPuzzle(num), 800);
    } else {
        // Voor verkeerde antwoorden: ga toch verder, maar zonder bericht
        answers[num] = value; // sla verkeerd antwoord op
        localStorage.setItem('answer' + num, value);
        setTimeout(() => nextPuzzle(num), 800);
    }
};


function nextPuzzle(num) {
    if (num < 4) {
        document.getElementById('card-' + num).classList.remove('active');
        document.getElementById('card-' + (num + 1)).classList.add('active');
        document.getElementById('step-' + num).classList.add('done');
        document.getElementById('step-' + num).classList.remove('active');
        document.getElementById('step-' + (num + 1)).classList.add('active');
        window.scrollTo({top : 0, behavior : 'smooth'});
    } else {
        document.getElementById('card-' + num).classList.remove('active');
        document.getElementById('step-4').classList.add('done');
        document.getElementById('step-4').classList.remove('active');
        setTimeout(() => {
            window.location.href = 'codelock.html';
        }, 1000);
    }
}       


function toggleHint(num) {
    const hint = document.getElementById('hint' + num);
    hint.style.display = hint.style.display === 'block' ? 'none' : 'block';
}