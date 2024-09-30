import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap';
import { useUserProfile } from "../graphql/getProfile";
import { UserProfileDetails } from "../graphql/types/UserTypes";

function Stats() {
    const [queryResult, setQueryResult] = useState<UserProfileDetails | null>(null);
    const { loading, data, fetchProfile } = useUserProfile();

    useEffect(() => {
        if (data && data.matchedUser) {
            setQueryResult(data.matchedUser.profile);
        } else {
            console.log("No data found");
        }
    }, [data]);

    useEffect(() => {
        // Fetch profile on component mount
        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Container>
            <h1>Stats</h1>
            {queryResult ? (
                <div>
                    <p>Real Name: {queryResult.realName}</p>
                    <p>About Me: {queryResult.aboutMe}</p>
                    <p>School: {queryResult.school}</p>
                    <p>Country: {queryResult.countryName}</p>
                    <p>Reputation: {queryResult.reputation}</p>
                    <p>Ranking: {queryResult.ranking}</p>
                    <img src={queryResult.userAvatar} alt="User Avatar" />
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </Container>
    );
}

export default Stats;