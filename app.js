const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir arquivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Função para calcular os dias restantes até o próximo ano
function diasParaProximoAno(data) {
    const anoAtual = new Date().getFullYear();
    const dataEscolhida = new Date(data);
    const proximoAno = new Date(`${anoAtual + 1}-01-01`);

    // Calcular diferença em milissegundos
    const diffMs = proximoAno - dataEscolhida;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Converter para dias
}

// Rota que recebe a data e retorna a quantidade de dias para o próximo ano
app.get('/dias-para-proximo-ano', (req, res) => {
    const data = req.query.data;
    if (data) {
        const diasRestantes = diasParaProximoAno(data);
        res.json({ dias: diasRestantes });
    } else {
        res.status(400).json({ error: 'Data inválida.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
