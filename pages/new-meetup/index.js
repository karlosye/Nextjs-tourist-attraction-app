import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import { useState } from "react";

import Head from "next/head";

const MeetupDetail = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // crete addMeetupHandler
  const addMeetupHandler = async (meetupData) => {
    setIsSubmitting(true);
    // make a request to the api:
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetupData)
    });

    alert("New event save to database! Now redirect to the main page");
    setIsSubmitting(false);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>New meetup</title>
      </Head>
      <NewMeetupForm
        onAddMeetup={addMeetupHandler}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default MeetupDetail;
