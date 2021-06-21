const DATABASE_URI = process.env.DATABASE_URI || 
                    'mongodb://localhost/email-scheduler-service-db';

const mongoose = require('mongoose');

mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log("Database connected succesfully");
});
