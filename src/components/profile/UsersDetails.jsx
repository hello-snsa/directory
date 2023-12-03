import React from 'react';

export default function UsersDetails({ userData }) {

    return (
        <div className='card user-details flex jc-sb'>
            <div className='user-details-left'>
                <p>{userData.name}</p>
                <span>{userData.username}</span>
                {" | "}
                <span>{userData?.company?.catchPhrase}</span>
            </div>
            <div>
                <p>{userData?.address?.street}</p>
                <span>{userData.email}</span>
                {" | "}
                <span>{userData.phone}</span>
            </div>
        </div>
    )
}