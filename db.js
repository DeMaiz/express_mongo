const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'shoaibExpress';

// Create a new MongoClient
const client = new MongoClient(url);


exports.init = function(callback){
	// Use connect method to connect to the Server
	client.connect(function(err) {
		if(err){
			console.log("Unable to connect ");
			return;		
		}
	  console.log("Connected successfully to server");
	  const db = client.db(dbName);
	  const insertDocuments = function(data,callback) {
	  	console.log(data);
		  // Get the documents collection
		  const collection = db.collection('documents');
		  // Insert some documents
		  collection.insertMany([
		    {a : 1}, {a : 2}, {a : 3}
		  ], function(err, result) {
		    console.log("Inserted 3 documents into the collection");
		    callback(result);
		  });
	   }

	   const select = function (callback){
	   		const  collection = db.collection('documents');
	   		//selecting documents of all documents 
	   		collection.find({}).toArray(function(err, docs) {
			    console.log("Found the following records");
			    console.log(docs)
			    callback(docs);
			});
	   }

	  if(callback && typeof callback == "function"){
	  		callback({
	  			insert: insertDocuments,
	  			select: select
	  		})
	  }

	});

}

