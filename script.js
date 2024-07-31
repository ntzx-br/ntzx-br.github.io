document.addEventListener('DOMContentLoaded', () => {
    const raffleForm = document.getElementById('raffleForm');
    const participantsList = document.getElementById('participantsList');
    const drawButton = document.getElementById('drawButton');
    const countdown = document.getElementById('countdown');
    const winner = document.getElementById('winner');
    const participants = {};

    raffleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const number = document.getElementById('number').value;
        const name = document.getElementById('name').value;

        if (participants[number]) {
            alert(`Número ${number} já foi escolhido!`);
            return;
        }

        participants[number] = name;
        const listItem = document.createElement('li');
        listItem.textContent = `Número ${number}: ${name}`;
        participantsList.appendChild(listItem);

        raffleForm.reset();
    });

    drawButton.addEventListener('click', () => {
        const keys = Object.keys(participants);
        if (keys.length < 1) {
            alert('Nenhum participante na rifa!');
            return;
        }

        let timeLeft = 5;
        countdown.textContent = `Sorteando em: ${timeLeft}`;
        countdown.style.display = 'block';
        winner.style.display = 'none';

        const timer = setInterval(() => {
            timeLeft -= 1;
            countdown.textContent = `Sorteando em: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                const randomIndex = Math.floor(Math.random() * keys.length);
                const winningNumber = keys[randomIndex];
                countdown.style.display = 'none';
                winner.textContent = `O vencedor é ${participants[winningNumber]} com o número ${winningNumber}!`;
                winner.style.display = 'block';
            }
        }, 1000);
    });
});
