import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const HomePage = () => {
    const [auth, setAuth] = useAuth();
    const [post, setPost] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [createPostLoading, setCreatePostLoading] = useState(false);
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/get-post`);
            setPost(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch posts');
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    
    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            setCreatePostLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/posts/create-post`, { content: newPostContent });
            setPost([data, ...post]);
            setNewPostContent("");
            toast.success('Post created successfully!');
            setCreatePostLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to create post');
            setCreatePostLoading(false);
        }
    };
    return (
        <Layout title="LinkedIn - Connect to the world">
            <div className="container-fluid" style={{backgroundColor: '#f3f2ef', minHeight: '100vh'}}>
                <div className="row justify-content-center py-4">
                    <div className="col-lg-6 col-md-8">
                        {/* Create Post */}
                        <div className="card mb-3 border-0 shadow-sm">
                            <div className="card-body p-3">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '48px', height: '48px', fontSize: '1.2rem', fontWeight: 'bold'}}>
                                        {auth?.user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <form onSubmit={handleCreatePost} className="flex-grow-1">
                                        <textarea
                                            className="form-control border-0 bg-light"
                                            placeholder={`What's on your mind, ${auth?.user?.name?.split(' ')[0] || 'user'}?`}
                                            value={newPostContent}
                                            onChange={(e) => setNewPostContent(e.target.value)}
                                            rows="3"
                                            disabled={createPostLoading}
                                            maxLength="500"
                                            style={{resize: 'none', fontSize: '16px'}}
                                        />
                                        <div className="text-end text-muted mt-1" style={{fontSize: '12px'}}>
                                            {newPostContent.length}/500
                                        </div>
                                        <div className="d-flex justify-content-end mt-2">
                                            <button
                                                type="submit"
                                                className="btn btn-primary px-4"
                                                disabled={createPostLoading || !newPostContent.trim()}
                                                style={{borderRadius: '20px', fontWeight: '600'}}
                                            >
                                                {createPostLoading ? 'Posting...' : 'Post'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Posts Feed */}
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : post.length === 0 ? (
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <h5 className="text-muted">No posts yet</h5>
                                    <p className="text-muted">Be the first to share something!</p>
                                </div>
                            </div>
                        ) : (
                            post.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default HomePage