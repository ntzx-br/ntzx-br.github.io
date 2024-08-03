async function askQuestion() {
    const questionInput = document.getElementById('question');
    const question = questionInput.value.trim();
    const chatOutput = document.getElementById('chat-output');

    if (question === "") {
        alert("Por favor, digite uma pergunta.");
        return;
    }

    // Adiciona a pergunta no chat
    const userMessage = document.createElement('p');
    userMessage.textContent = `Você: ${question}`;
    chatOutput.appendChild(userMessage);

    // Limpa o campo de entrada
    questionInput.value = "";

    // Envia a pergunta ao backend
    const response = await fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question })
    });

    const data = await response.json();

    // Adiciona a resposta no chat
    const aiMessage = document.createElement('p');
    aiMessage.textContent = `IA: ${data.answer}`;
    chatOutput.appendChild(aiMessage);

    // Faz scroll para a nova mensagem
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
