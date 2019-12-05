const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useFindAndModify: true,
    autoReconnect: true,
    useUnifiedTopology: true,
};

module.exports = function () {
    mongoose
        .connect(process.env.DB_CONN,
            options,
            (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Database connected successfully!');
            });
};