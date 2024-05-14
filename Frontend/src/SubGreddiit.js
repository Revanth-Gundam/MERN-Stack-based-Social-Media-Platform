import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api/api';
import Logo from './logo.svg';

function SubgreddiitPage () {
  const { id } = useParams();
  const [subgreddiit, setSubgreddiit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await api.post(`/api/posts`, { text: postContent });
      console.log(response.data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchSubgreddiit () {
      try {
        const response = await api.post(`/api/subgreddiit/list/${id}`);
        setSubgreddiit(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSubgreddiit();
  }, [id]);

  return (
    <>
      <div>
      <img src={Logo} alt="Logo" width="50%" height="50%" />
        {subgreddiit ? (
          <div>
            <h1>Name: {subgreddiit.name}</h1>
            <p>Desc: {subgreddiit.description}</p>
          </div>
        ) : (
          <p>Loading..., Wait a few seconds</p>
        )}
      </div>
      <div style={{ margin: 20, marginLeft: 100 }}>
        <button onClick={() => setShowModal(true)}>Create Post</button>
      </div>
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: 20 }}>
            <h2>Create Post</h2>
            <input type="text" value={postContent} onChange={(e) => setPostContent(e.target.value)} style={{ width: '80%', height: '100px', fontSize: '16px' }} />
            <button onClick={handleCreatePost}>Submit</button>
          </div>
        </div>
      )}
      <div>
        <h2 >Posts</h2>
          <div style={{}}>
            <h3> Post - UserName: admin</h3>
            <p>IIITH is amazing college, all of you join.</p>

            <button >4 Likes </button>

            {/* <h3>4 Likes</h3> */}
            {/* <p>{post.likes}</p> */}
            <button >2 Dislikes </button>

            {/* <h3>2 Dislikes</h3> */}
            {/* <p>{post.dislikes}</p> */}

            <div>
              <h4>3 Comments</h4>
              {/* {post.comments.map((comment) => ( */}
                <div>
                  <p>Amazing</p>
                  </div>
                  <div>
                  <p>Nice</p>
                  </div>
                  <div>
                  <p>Not Good</p>
                  </div>
                {/* ))} */}
                <button >Report </button>

            </div>
          </div>
        
                  {/* <div>
                    <h4>Replies</h4>
                    {comment.replies.map((reply) => (
                      <div key={reply.id}>
                        <p>{reply.text}</p>

                        <div> */}
                        
      </div>
    </>
  );
}

export default SubgreddiitPage;