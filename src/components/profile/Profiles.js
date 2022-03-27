import "./Profiles.css";
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
    <div className="profiles-page">
      {data.profiles.items.map((profile) => {
        return (
          <div className="profile-card">
            <h2>{profile.name}</h2>
            <h3>@{profile.handle}</h3>
            <h3>{profile.id}</h3>
            <h4>{profile.bio}</h4>
            <h4>🗺️{profile.location}</h4>
            <h4>{profile.twitterUrl}</h4>
            <h4>{profile.ownedBy}</h4>
            <div className="profile-stats">
              <h3>{profile.stats.totalFollowers} Followers</h3>
              <h3>{profile.stats.totalFollowing} Following</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Profiles;
