import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROFILES } from "../../graphQL/queries/get-profile";
import { LoginContext } from "../../context/LoginContext";

function Profiles() {
  const { currentAccount } = useContext(LoginContext);
  const { error, loading, data } = useQuery(GET_PROFILES, { variables: { request: { ownedBy: [currentAccount] } } });
  console.log({ error, loading, data });

  if (loading) {
    return <div>spinner...</div>;
  }

  if (error) {
    return <div>something went wrong...</div>;
  }

  return (
    <div>
      <button>connected: {currentAccount}</button>
      {data.profiles.items.map((profile) => {
        return (
          <div>
            <h1>{profile.name}</h1>
            <h2>{profile.id}</h2>
            <h3>{profile.bio}</h3>
            <h3>{profile.location}</h3>
            <h3>{profile.twitterUrl}</h3>
            <h3>{profile.ownedBy}</h3>
            <h2>{profile.stats.totalFollowers} Followers</h2>
            <h2>{profile.stats.totalFollowing} Following</h2>
          </div>
        );
      })}
    </div>
  );
}

export default Profiles;
