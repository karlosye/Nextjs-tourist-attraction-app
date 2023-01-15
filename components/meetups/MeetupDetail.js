import classes from "./MeetupDetail.module.css";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

function MeetupDetail(props) {
  const router = useRouter();

  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);

  const deleteEventHandler = async () => {
    if (window.confirm("Please confirm: delete this event?")) {
      // connect to MongoDB to delete this event via the id:
      // console.log(props.id);

      setIsDeleteBtnClicked(true);

      const response = await fetch("/api/delete-meetup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.id })
      });

      alert("event deleted!! Now redirect to the main page");
      router.replace("/");
    }
  };

  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <div className={classes.actions}>
        <button onClick={deleteEventHandler}>Delete Attraction</button>
        {isDeleteBtnClicked && <LoadingSpinner />}
      </div>
    </section>
  );
}

export default MeetupDetail;
