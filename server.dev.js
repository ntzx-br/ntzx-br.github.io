"use strict";

var express = require('express');

var axios = require('axios');

var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());
app.use(express["static"]('public')); // Serve arquivos estáticos do diretório "public"
// Rota para lidar com as perguntas

app.post('/ask', function _callee(req, res) {
  var question, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          question = req.body.question;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{
              role: 'user',
              content: question
            }]
          }, {
            headers: {
              'Authorization': "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"
            }
          }));

        case 4:
          response = _context.sent;
          res.json({
            answer: response.data.choices[0].message.content
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            error: 'Algo deu errado ao processar sua solicitação.'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Inicia o servidor

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Servidor rodando na porta ".concat(PORT));
  console.log("Pergunta recebida:", question);
});