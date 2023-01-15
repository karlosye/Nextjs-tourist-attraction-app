// route: .../api/new-meetup

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    console.log("---making connection to MongoDB---");

    // const { title, image, address, description } = data;

    // configure MongoDB
    const client = await MongoClient.connect(
      "mongodb+srv://admin-Karlos:yejiahao1234@meetups.sqbg7zn.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
};

export default handler;
