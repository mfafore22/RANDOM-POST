import { useState,useEffect } from 'react';

import './App.css'

const initPosts = [
  {
    id:0,
    url:"https://cdn.pixabay.com/photo/2025/05/18/14/48/asakusa-temple-9607423_1280.jpg",
    title:"What a post",
  },
  {
    id:1,
    url:"https://cdn.pixabay.com/photo/2025/05/18/14/44/asakusa-temple-9607420_1280.jpg",
    title:"China"
  },
  {
    id:2,
    url:"https://cdn.pixabay.com/photo/2025/05/15/16/35/cat-9602315_1280.jpg",
    title:"kissa"
 }
];
const ActivePost = ({activePost, onCreatePost: createPost, setActivePost, onPublishPost: publishPost, onGeneratePost:generatePost }) => {
  if(!activePost){
    return(
      <>
      <button className='btn btn-primary btn-block' onClick={createPost}>
       Create Post 
      </button>
      <button className='btn btn-success btn-block' onClick={generatePost}>
        Generate Random Post
      </button>
      </>
    );
  }
  const handleSubmitPost = (event) =>{
    event.preventDefault();
    publishPost();
  }
  return(
  <form className='card p-3' onSubmit={handleSubmitPost}>
    <div className='form-group'>
       <label htmlFor='URL'>Image URL</label>
       <input type='url' name='url' id='url' placeholder="https://example.com/image.jpg" required value={activePost.url} onChange={(event) => setActivePost({...activePost, url: event.target.value})}/>
    </div>
    <div className='form-group'>
       <label htmlFor='title'>Image URL</label>
       <input type='title' name='title' id='title' placeholder = "Your Title" required value={activePost.title} onChange={(event) => setActivePost({...activePost, title: event.target.value})}/>
    </div>
    <button type='submit' className='btn btn-primary'>Publish</button>

  </form>
  )

}
const PostItemView = ({post, onDeletePost: deletePost, onEdit: editPost }) => {
  const {id, url , title}= post;

  return(
    <>
    <div className='col-md-6 col-lg-4 p-1'>
     <div className='p-1'>
      <img
      src={url}
      alt={title}
      className="card-img-top w-100"
      height={200}
      />
      <p className='card-text'>{title}</p>
      <div>
        <button className='btn btn-primary' onClick={() => editPost(id)}>Edit</button>
        <button className='btn btn-danger' onClick={() => deletePost(id)}>Delete</button>
      </div>


     </div>
    </div>

    
    
    </>
  )
}



export default function App() {
  const [posts, setPosts] =useState(initPosts);
  const [idCounter, setIdCounter] = useState(initPosts.length);
  const [activePost, setActivePost] = useState(null);
  const [mode,setMode] = useState("Add");
  const [isLoading,setIsLoading] = useState(false);
  
  const handleCreatePost = () => {
    setActivePost({url:"", title:"", id:idCounter});
    setIdCounter(idCounter + 1);
  }
  const handlePublishPost =()=> {
    if (mode === "ADD"){
      setPosts([activePost, ...posts]);
      setActivePost(null);
    }
    if (mode === "EDIT"){
      setPosts(prevPost => prevPost.map(post => post.id === activePost.id ? activePost : post));
    };
    setMode("ADD");
    setActivePost(null);
  }
  const handleDeletePost = (id) => {
    setPosts(posts.filter((post)=> post.id !== id));
  } 
  const handleGenerateRandomPost = async () => {
    setIsLoading(true);
    try{
      const randomId = Math.floor(Math.random() * 20);
      const response = await fetch(`https://api.slingacademy.com/v1/sample-data/photos/${randomId}`);
      const data = await response.json();
      if(!data?.photo?.url){
        throw new Error("No valid photo returned");
      }
      const newPost = {
        id: idCounter,
        url: data.photo.url,
        title: data.photo.title ||`Generated Post ${idCounter}`,
      }
      setPosts([newPost, ...posts]);
      setIdCounter(idCounter + 1);

    }catch(error){
      console.log(error);

    }finally{
      setIsLoading(false);
    }
  }
  const handleEditPost = (post) => {
   setMode("Edit");
   setActivePost(post);

  }
  //useEffect(() => {
   //handleGenerateRandomPost();
  //}, []);

  return (
    <>
    <div class="container bg-light vh-100 pt-5">
     <div className='mb-3'>
      <ActivePost activePost={activePost} onCreatePost={handleCreatePost} setActivePost={setActivePost} onPublishPost={handlePublishPost} onGeneratePost={handleGenerateRandomPost}/>
     </div>
     <div>{isLoading && "LOADING"}</div>
     <div className='row'>
     {posts.map((post) => (<PostItemView post={post}key={post.id} onDeletePost={handleDeletePost} onEdit={handleEditPost}  />))}
     </div>
    </div>
    </>
  )
}


