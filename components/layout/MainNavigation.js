import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Tourist Attraction</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Atrractions</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Attraction</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
