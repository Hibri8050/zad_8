const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/save-form', (req, res) => {
    const formData = req.body;

    fs.readFile('messages.json', 'utf8', (err, data) => {
        let messages = [];

        if (!err && data) {
            messages = JSON.parse(data);
        }

        messages.push(formData);

        fs.writeFile('messages.json', JSON.stringify(messages, null, 2), err => {
            if (err) {
                return res.status(500).json({ message: 'Błąd zapisu danych' });
            }

            res.json({ message: 'Dane zapisane poprawnie!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server działa na http://localhost:${PORT}`);
});
