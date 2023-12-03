import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import NameCard from './NameCard';
import { BASE_URL, POSTS_DATA_URL, USERS_DATA_URL } from '../../utils/constants';

export default function NameCardContainer() {

    const [usersData, setUsersData] = useState([]);
    const [postsData, setPostsData] = useState([]);
    const [usersMetaData, setUsersMetaData] = useState([]);

    const fetchUserData = async () => {
        const response = await axios.get(BASE_URL + USERS_DATA_URL);
        setUsersData(response.data);
    }

    const fetchPostsData = async () => {
        const response = await axios.get(BASE_URL + POSTS_DATA_URL);
        setPostsData(response.data);
    }

    useEffect(() => {
        fetchUserData();
        fetchPostsData();
    }, []);

    useEffect(() => {
        const comboData = usersData?.map((user) => {
            const posts = postsData?.filter((post) => {
                return post.userId === user.id;
            })
            return {
                ...user,
                post: posts
            }
        })
        setUsersMetaData(comboData);
    }, [usersData, postsData]);

    return (
        <div className='name-card-container'>
            {
                usersMetaData?.map(user =>
                    <NameCard userData={user} postData={user.post} key={uuid()} />
                )
            }
        </div>
    )
}