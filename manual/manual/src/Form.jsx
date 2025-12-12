import { useState, useEffect } from 'react'
import axios from 'axios'

function Form() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPosts();
  }, []);

  const addPost = async(e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const res = await axios.post('http://localhost:3001/posts', { user_id: Number(userId), text });
      setPosts(prev => [{ ...res.data, user_id: Number(userId), username: localStorage.getItem("username") }, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async(id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}/${userId}`);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
        <h1>Form</h1>
        <div>
          <form onSubmit={addPost}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button>Create</button>
          </form>
          {posts.map((p) => (
            <div key={p.id}>
              <strong>{p.username}</strong> <span>{p.text}</span>
              {String(p.user_id) === String(userId) && (
                <button onClick={() => deletePost(p.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
    </div>
  );
}

export default Form