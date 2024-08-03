const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve arquivos estáticos do diretório "public"

// Rota para lidar com as perguntas
app.post('/ask', async (req, res) => {
    const question = req.body.question;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: question }],
        }, {
            headers: { 'Authorization': `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` }
        });

        res.json({ answer: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Algo deu errado ao processar sua solicitação.' });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("Pergunta recebida:", question);

});
