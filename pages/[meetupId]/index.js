import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
      </Head>
      <MeetupDetail
        id={props.meetupData.id}
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

// getStaticPaths() function needs to be implemented for dynamic pages
export async function getStaticPaths() {
  // grab a list of IDs from MongoDB, and set to paths
  const client = await MongoClient.connect(
    "mongodb+srv://admin-Karlos:yejiahao1234@meetups.sqbg7zn.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: true,
    // paths is an array of objects: [{params:{meetupId:}}]
    paths: meetups.map((meetup) => {
      return { params: { meetupId: meetup._id.toString() } };
    })
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // connect to MongoDB and use the Id to find
  const client = await MongoClient.connect(
    "mongodb+srv://admin-Karlos:yejiahao1234@meetups.sqbg7zn.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId)
  });

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      }
    }
  };
}

export default MeetupDetails;
