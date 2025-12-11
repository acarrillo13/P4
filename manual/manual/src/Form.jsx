import { useState } from 'react'
import axios from 'axios'

function Form() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  
  const addPost = (e) => {
    e.preventDefault();
    if (!text) return;
    setPosts([...postMessage, {id:Date.com(), text}])
    setText("");
  }

  const deletePost = (id) => {
    setPosts(postMessage.filter((post) => post.id !== id));
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
          {postMessage.map(p=> (
            <div key={p.id}>
              {p.text}
              <button onClick={() => deletePost(p.id)}>Delete</button>
            </div>
          ))}
        </div>

    </div>
  );
}

export default Form