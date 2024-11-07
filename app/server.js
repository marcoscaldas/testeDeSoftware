const express = require('express');
const db = require('./config/dbConfig');
const fs = require('fs'); // Importa o módulo fs para manipulação de arquivos
const path = require('path'); // Importa o módulo path para manipulação de caminhos

const app = express();
const PORT = process.env.PORT || 3000;

// Cria um stream de escrita para o arquivo de log
const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'app.log'), { flags: 'a' });

// Redireciona console.log para o arquivo de log
console.log = (...args) => {
    logStream.write(args.join(' ') + '\n'); // Escreve no log
    process.stdout.write(args.join(' ') + '\n'); // Também imprime no console
};
//
// Exemplo de log inicial
console.log('Servidor iniciado...');

app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            console.error('Erro ao buscar usuários:', error); // Log do erro
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        } else {
            console.log('Usuários encontrados:', results.length); // Log de sucesso
            res.json(results);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
