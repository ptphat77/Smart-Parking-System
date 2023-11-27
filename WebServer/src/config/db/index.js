const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://20521740:sXbC80IivBT29nDS@twitterdb.hrxvzr3.mongodb.net/Smart-Parking-DB',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Connnect database successfully!!!');
    } catch (error) {
        console.log('Connnect database failure!!!');
    }
}

module.exports = { connect };