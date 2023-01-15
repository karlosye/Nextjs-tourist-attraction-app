import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    console.log("---making connection to MongoDB---");

    // configure MongoDB
    const client = await MongoClient.connect(
      "mongodb+srv://admin-Karlos:yejiahao1234@meetups.sqbg7zn.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.deleteMany({
      _id: ObjectId(data.id)
    });

    client.close();

    res.status(201).json({ message: "meetup deleted!" });
  }
};

export default handler;
