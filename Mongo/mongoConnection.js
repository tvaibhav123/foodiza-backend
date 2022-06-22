const {MongoClient}  = require('mongodb');

const connectToCluster = async () => {
    let mongoClient;
    const uri = "mongodb://localhost:27017";
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}
module.exports.connectToCluster = connectToCluster;