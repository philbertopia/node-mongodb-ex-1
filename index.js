// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert').strict;

// const url = 'mongodb://localhost:27017/';
// const dbname = 'nucampsite';

// MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

//     assert.strictEqual(err, null);

//     console.log('Connected correctly to server');

//     const db = client.db(dbname);

//     db.dropCollection('campsites', (err, result) => {
//         assert.strictEqual(err, null);
//         console.log('Dropped Collection', result);

//         const collection = db.collection('campsites');

//         collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
//         (err, result) => {
//             assert.strictEqual(err, null);
//             console.log('Insert Document:', result.ops);

//             collection.find().toArray((err, docs) => {
//                 assert.strictEqual(err, null);
//                 console.log('Found Documents:', docs);

//                 client.close();
//             });
//         });
//     });
// });

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection('campsites');

    // Insert a document
    const document = { name: "Breadcrumb Trail Campground", description: "Test" };
    collection.insertOne(document, (insertErr, insertResult) => {
        if (insertErr) {
            console.error('Error inserting document:', insertErr);
            client.close();
            return;
        }
        console.log('Insert Document:', insertResult.ops);

        // Find all documents
        collection.find().toArray((findErr, docs) => {
            if (findErr) {
                console.error('Error finding documents:', findErr);
            } else {
                console.log('Found Documents:', docs);
            }
            client.close();
        });
    });
});
