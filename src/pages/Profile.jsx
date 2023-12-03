import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import '../components/profile/profile.css';
import ProfileHeader from '../components/profile/ProfileHeader';
import UsersDetails from '../components/profile/UsersDetails';
import PostsDetails from '../components/profile/PostsDetails';
import { BASE_URL, POSTS_DATA_URL, USERS_DATA_URL } from '../utils/constants';

export default function Profile() {

  const { id } = useParams();
  const location = useLocation();
  const incomingData = location.state;

  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);

  const fetchUserData = async () => {
    const response = await axios.get(BASE_URL + USERS_DATA_URL + id);
    setUserData(response.data);
  }


  const fetchPostData = async () => {
    const response = await axios.get(BASE_URL + USERS_DATA_URL + id + "/" + POSTS_DATA_URL);
    setPostData(response.data);
  }

  useEffect(() => {
    console.log("incomingData: ", incomingData)
    if (incomingData === null || incomingData === undefined) {
      fetchUserData();
      fetchPostData();
    } else {
      setPostData(incomingData.postData);
      setUserData(incomingData.userData);
    }
  }, []);

  return (
    <div className='profile flex-col' >
      <ProfileHeader />
      <div className='header'>
        <p>Profile Page</p>
      </div>
      <UsersDetails userData={userData} />
      <PostsDetails postData={postData} />
    </div>
  )
}