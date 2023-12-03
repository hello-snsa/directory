import React from 'react';

export default function PostModal({ data }) {

    return (
        <div className='post-modal'>
            <div className='post-modal-top flex jc-sb'>
                <p>User ID: {data.userId}</p>
                <p>Post ID: {data.id}</p>
            </div>
            <div>
                <p className='title'>{data.title}</p>
                <p>{data.body}</p>
            </div>
        </div>
    )
}
