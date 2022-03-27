import "./Feeds.css";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS } from "../../graphQL/queries/explore-publications";

function Feeds() {
  const { error, loading, data } = useQuery(EXPLORE_PUBLICATIONS, { variables: { request: { sortCriteria: "TOP_COMMENTED", limit: 10 } } });
  console.log({ error, loading, data });
  if (loading) {
    return <div>spinner...</div>;
  }

  if (error) {
    return <div>something went wrong...</div>;
  }

  return (
    <div className="feeds-page">
      Feeds
      {data.explorePublications.items.map((publication) => {
        return (
          <div className="feed-cards">
            <h2>
              {publication.profile.handle} {publication.profile.id}
            </h2>
            <div className="content-container">
              <h3>{publication.metadata.content}</h3>
            </div>
            <div className="bottom-buttons">
              <h4>
                collects {publication.stats.totalAmountOfCollects}, comments {publication.stats.totalAmountOfComments}, mirrors{" "}
                {publication.stats.totalAmountOfMirrors}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feeds;
