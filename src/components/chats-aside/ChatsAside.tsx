import React, { FC } from "react";
import { ChatsAsideProps } from "./props";
import { Link } from "react-router-dom";
import UserSearch from "../user-search";
import styles from "./ChatsAside.module.scss";
import { APP_ROUTES } from "../../routes/routes";
import Dialog from "../dialog";
import Scrollbar from "../scrollbar";

const ChatsAside: FC<ChatsAsideProps> = () => {
  return (
    <aside className={styles.aside}>
      <section className={styles.aside__header}>
        <Link to={APP_ROUTES.PROFILE} className={styles.aside__link}>
          Profile
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 9L5 5L1 1" stroke="#999999" />
          </svg>
        </Link>
        <UserSearch />
      </section>
      <section className={styles.aside__list}>
        <Scrollbar>
          <ul>
            {Array(15)
              .fill(null)
              .map((_, index) => (
                <li key={index}>
                  <Dialog
                    title="Title 1"
                    message="Messege text here"
                    unread={4}
                    avatar="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                  />
                </li>
              ))}
          </ul>
        </Scrollbar>
      </section>
    </aside>
  );
};

export default ChatsAside;
