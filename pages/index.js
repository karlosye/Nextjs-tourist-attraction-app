import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

import { MongoClient } from "mongodb";

const MainPage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  // connect to mongodb client
  const client = await MongoClient.connect(
    "mongodb+srv://admin-Karlos:yejiahao1234@meetups.sqbg7zn.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          id: meetup._id.toString(),
          image: meetup.image,
          title: meetup.title,
          address: meetup.address
        };
      })
    },
    revalidate: 10
  };
};

export default MainPage;
