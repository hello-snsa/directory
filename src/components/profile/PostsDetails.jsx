import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import PostModal from './PostModal';

export default function PostsDetails({ postData }) {

    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState([]);

    const handlePostClick = (post) => {
        setModalData(post);
        setModalStatus(true);
    }

    const handleOutsideClick = (e) => {
        if (e.target.id === "modal") {
            setModalStatus(false);
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);
        return () => {
            window.removeEventListener("click", handleOutsideClick);
        }
    }, []);

    return (
        <div className='card posts-details' >
            {postData?.map(post => <div className="post-container " key={uuid()} onClick={() => handlePostClick(post)} >
                <p className='title'>{post.title}</p>
                <p>{post.body}</p>
            </div>
            )
            }
            {modalStatus ? <div className='modal-container' id="modal">
                <PostModal data={modalData} isOpen={modalStatus} setClose={setModalStatus}
                />
            </div> : null}
        </div>
    )
}
