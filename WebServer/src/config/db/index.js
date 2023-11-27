const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://20521740:sXbC80IivBT29nDS@twitterdb.hrxvzr3.mongodb.net/Smart-Parking-DB',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Connnect successfully!!!');
    } catch (error) {
        console.log('Connnect failure!!!');
    }
}

module.exports = { connect };