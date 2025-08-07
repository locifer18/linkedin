import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout'; // Assuming this component exists
import PostCard from '../components/PostCard';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams(); // Get user ID from URL
  const [profileUser, setProfileUser] = useState(null); // Renamed to profileUser for clarity
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Added state for error messages

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) {
        setError('No user ID provided');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/profile/${id}`);
        setProfileUser(response.data.user);
        setUserPosts(response.data.posts || []);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load user profile.');
        setProfileUser(null);
        setUserPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return (
      <Layout title="Loading Profile...">
        <div className="d-flex justify-content-center align-items-center bg-light rounded-lg shadow-sm p-5" style={{ minHeight: '200px' }}>
          <div className="text-center text-muted fs-5">Loading profile...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Profile Error">
        <div className="alert alert-danger text-center p-4 rounded-lg shadow-sm" role="alert">
          {error}
        </div>
      </Layout>
    );
  }

  if (!profileUser) {
    return (
      <Layout title="User Not Found">
        <div className="alert alert-warning text-center p-4 rounded-lg shadow-sm" role="alert">
          User not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${profileUser?.name} - Profile`}>
      <div className="container-fluid" style={{backgroundColor: '#f3f2ef', minHeight: '100vh'}}>
        <div className="row justify-content-center py-4">
          <div className="col-lg-6 col-md-8">
            {/* Profile Header */}
            <div className='card mb-3 border-0 shadow-sm'>
              <div className='card-body p-4 text-center'>
                <div className='bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center' style={{ width: '80px', height: '80px', fontSize: '2rem', fontWeight: 'bold' }}>
                  {profileUser?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className='fw-bold mb-1' style={{fontSize: '24px'}}>
                  {profileUser?.name}
                </h2>
                <p className='text-muted mb-2' style={{fontSize: '14px'}}>{profileUser?.email}</p>
                <p className='text-secondary' style={{fontSize: '15px', lineHeight: '1.4'}}>
                  {profileUser?.bio || "No bio available."}
                </p>
              </div>
            </div>

            {/* Posts Section */}
            <div className="mb-3">
              <h5 className="text-dark mb-3">Posts by {profileUser?.name?.split(' ')[0]}</h5>
              {userPosts?.length > 0 ? (
                userPosts.map((postItem) => (
                  <PostCard key={postItem._id} post={postItem} />
                ))
              ) : (
                <div className="card border-0 shadow-sm">
                  <div className="card-body text-center py-5">
                    <h6 className="text-muted">No posts yet</h6>
                    <p className="text-muted mb-0">This user hasn't shared anything yet.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
