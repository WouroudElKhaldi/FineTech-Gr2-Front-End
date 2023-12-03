import * as React from "react";

import Style from "./ActivityCard.module.css";

export default function ActivityCard({ cont }) {
  return (
    <>
      <div className={Style.cardComp}>
        <div className={Style.insCard}>{cont}</div>
      </div>
    </>
  );
}
