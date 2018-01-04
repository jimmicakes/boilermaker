if (process.env.NODE_ENV === 'development') {
    require('./localSecret');
}

const app = require('./server');
const PORT = process.env.PORT || 3000;
const db = require('./server/db/_db');

db.sync()
    .then(app.listen(PORT, () =>
        console.log(`Listening on port ${PORT}`)));