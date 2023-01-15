import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";

import { useRouter } from "next/router";
import { useState } from "react";

function MeetupItem(props) {
  const router = useRouter();

  const [isShowDetailClicked, setisShowDetailClicked] = useState(false);

  const showDetailHandler = () => {
    setisShowDetailClicked(true);
    router.push("/" + props.id);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
          {isShowDetailClicked && <LoadingSpinner />}
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
