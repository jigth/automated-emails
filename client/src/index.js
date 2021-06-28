require('dotenv').config();

const app = require('./app');
const PORT = process.env.CLIENT_PORT;

app.listen(PORT, () => {
    console.log(`Client server listening on port ${PORT}`);
});
