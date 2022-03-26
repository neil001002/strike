import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS } from "../../graphQL/queries/explore-publications";

function Feeds() {
  const { error, loading, data } = useQuery(EXPLORE_PUBLICATIONS, { variables: { request: { sortCriteria: "TOP_COMMENTED", limit: 1 } } });
  console.log({ error, loading, data });
  if (loading) {
    return <div>spinner...</div>;
  }

  if (error) {
    return <div>something went wrong...</div>;
  }

  return (
    <div>
      Feeds
      {data.explorePublications.items.map((publication) => {
        return (
          <div>
            <h1>
              {publication.profile.handle} {publication.profile.id}
            </h1>
            <h2>{publication.metadata.content}</h2>
            <h3>
              collects {publication.stats.totalAmountOfCollects}, comments {publication.stats.totalAmountOfComments}, mirrors{" "}
              {publication.stats.totalAmountOfMirrors}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Feeds;
