import React from 'react';
import { Link } from 'react-router-dom';

export default function NameCard({ userData, postData }) {

    const totalNumberOfPosts = postData?.length || 0;

    return (
        <div className='name-card flex-col'>
            <Link to={`/profile/${userData.id}`} className='link name-card-link flex jc-sb ai-c' state={{ postData: postData, userData: userData }}>
                <p>Name: {userData.name}</p>
                <p>Posts: {totalNumberOfPosts}</p>
            </Link>
        </div>
    )
}