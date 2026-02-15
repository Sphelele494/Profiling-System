import React, { useState, useRef, useEffect } from 'react';
import {
  Users, Image, Video, SendHorizontal, X, Heart, MessageSquare,
  Share2, ThumbsUp, Bookmark, Clock, ShieldCheck, CheckCircle
} from "lucide-react";

// Mock images
import UserJourney1 from "../../assets/user_journey1.jpg";
import UserJourney2 from "../../assets/user_journey2.jpg";
import CompanyPost1 from "../../assets/company_post1.jpg";


function HomeTab({ user, setNotifications }) {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [postType, setPostType] = useState("journey");
  const [selectedImage, setSelectedImage] = useState(null);
  
  const postFileInputRef = useRef(null);

  // Mock data for initial posts
  const motivationalPosts = [
    {
      id: 1,
      user: "Thabo M.",
      userType: "ex-convict",
      role: "Construction Manager",
      icon: "👷",
      content: "Three years ago, I walked out of prison with nothing but hope. Today, I'm leading a team of 15 at BuildRight Construction in Soweto. Your past doesn't define your future. #SecondChances #SouthAfrica #SuccessStory #Construction",
      image: UserJourney1,
      timestamp: "2 hours ago",
      likes: 142,
      comments: [
        { id: 1, user: "Sarah K.", userType: "recruiter", content: "So inspiring! Thank you for sharing your journey!", timestamp: "1 hour ago", verified: true },
        { id: 2, user: "Soweto Hope Center", userType: "npo", content: "We're so proud of your journey Thabo! Keep inspiring others in our community.", timestamp: "45 min ago", verified: true }
      ],
      shares: 8,
      postType: "journey",
      verified: false,
      allowComments: true
    },
    {
      id: 2,
      user: "BuildRight Construction SA",
      userType: "recruiter",
      role: "Verified Employer",
      icon: "👔",
      content: "Our team-building event in Johannesburg last week! Proud to work with such dedicated South Africans. We're growing and always looking for hardworking people to join our family. #HiringSA #ConstructionJobs #TeamBuilding",
      image: CompanyPost1,
      timestamp: "3 hours ago",
      likes: 156,
      comments: [
        { id: 1, user: "Community Builders SA", userType: "ngo", content: "Great initiative! We'd love to partner with you on community projects.", timestamp: "2 hours ago", verified: true }
      ],
      shares: 22,
      postType: "company",
      verified: true,
      allowComments: true
    },
    {
      id: 4,
      user: "Mike T.",
      userType: "ex-convict",
      role: "Warehouse Supervisor",
      icon: "👤",
      content: "Completed my forklift certification today at the Johannesburg Training Centre! Another step forward in my career development. Never stop learning! #Certification #CareerGrowth #WarehouseSA",
      image: UserJourney2,
      timestamp: "5 hours ago",
      likes: 89,
      comments: [
        { id: 1, user: "Unitrans Logistics", userType: "recruiter", content: "Congratulations Mike! We're always looking for certified operators for our Gauteng warehouses.", timestamp: "3 hours ago", verified: true }
      ],
      shares: 15,
      postType: "achievement",
      verified: false,
      allowComments: true
    }
  ];

  // Post type options based on user type
  const postTypeOptions = user?.userType === "ex-convict" ? [
    { value: "journey", label: "My Journey", icon: "🚶" },
    { value: "achievement", label: "Achievement", icon: "🏆" },
    { value: "quote", label: "Motivational Quote", icon: "💭" },
    { value: "support", label: "Support/Advice", icon: "🤗" },
    { value: "question", label: "Ask Question", icon: "❓" }
  ] : user?.userType === "recruiter" ? [
    { value: "opportunity", label: "Job Opportunity", icon: "💼" },
    { value: "company", label: "Company Update", icon: "🏢" },
    { value: "quote", label: "Motivational Quote", icon: "💭" },
    { value: "event", label: "Career Event", icon: "📅" }
  ] : [
    { value: "volunteer", label: "Volunteer Work", icon: "🤝" },
    { value: "support", label: "Support/Advice", icon: "🤗" },
    { value: "education", label: "Educational Opportunity", icon: "🎓" },
    { value: "quote", label: "Motivational Quote", icon: "💭" },
    { value: "event", label: "Community Event", icon: "📅" }
  ];

  useEffect(() => {
    // Load posts from localStorage or use mock data
    const savedPosts = localStorage.getItem('relink_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(motivationalPosts);
      localStorage.setItem('relink_posts', JSON.stringify(motivationalPosts));
    }
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please select an image under 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewPost = () => {
    if (!newPost.trim() && !selectedImage) {
      alert("Please add some content or an image to post.");
      return;
    }
    
    if (newPost.length > 1000) {
      alert("Post content is too long. Maximum 1000 characters.");
      return;
    }
    
    const userType = user?.userType || "ex-convict";
    let postRole = "";
    let postIcon = "";
    
    switch(userType) {
      case "recruiter":
        postRole = "Verified Recruiter";
        postIcon = "👔";
        break;
      case "npo":
        postRole = "Non-Profit Organization";
        postIcon = "🤝";
        break;
      case "ngo":
        postRole = "Non-Governmental Organization";
        postIcon = "🌍";
        break;
      case "community":
        postRole = "Community Leader";
        postIcon = "👥";
        break;
      case "volunteer":
        postRole = "Volunteer Seeker";
        postIcon = "❤️";
        break;
      default:
        postRole = "RE-Link Member";
        postIcon = "👤";
    }
    
    const newPostObj = {
      id: posts.length + 1,
      user: user?.name || "Anonymous",
      userType: userType,
      role: postRole,
      icon: postIcon,
      content: newPost,
      image: selectedImage,
      postType: postType,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      shares: 0,
      verified: userType === "recruiter" || userType === "npo" || userType === "ngo" || userType === "community",
      allowComments: userType === "recruiter" || userType === "npo" || userType === "ngo" || userType === "community" || userType === "volunteer"
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setSelectedImage(null);
    setPostType("journey");
    if (postFileInputRef.current) {
      postFileInputRef.current.value = "";
    }
    
    setNotifications(prev => prev + 1);
    localStorage.setItem('relink_posts', JSON.stringify([newPostObj, ...posts]));
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const handleAddComment = (postId, comment) => {
    if (!comment.trim()) return;
    
    const userType = user?.userType || "ex-convict";
    const allowedToComment = ["recruiter", "npo", "ngo", "community", "volunteer"].includes(userType);
    
    if (!allowedToComment) {
      alert("Only employers, NGOs, NPOs, and community leaders can comment on posts.");
      return;
    }
    
    setPosts(posts.map(post => {
      if (post.id === postId && post.allowComments) {
        const newComments = [...post.comments, {
          id: post.comments.length + 1,
          user: user?.name || "Anonymous",
          userType: userType,
          content: comment,
          timestamp: "Just now",
          verified: ["recruiter", "npo", "ngo", "community"].includes(userType)
        }];
        return { ...post, comments: newComments };
      }
      return post;
    }));
  };

  return (
    <div className="home-tab">
      <div className="feed-header">
        <h3 className="feed-title">
          <Users size={24} />
          Community Feed
          <span className="feed-badge">{posts.length} posts</span>
        </h3>
        <div className="feed-actions">
          <div className="post-type-selector">
            <select 
              className="post-type-select"
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
            >
              {postTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="media-buttons">
            <button 
              className="upload-media-btn"
              onClick={() => postFileInputRef.current?.click()}
            >
              <Image size={20} />
              <span>Add Media</span>
            </button>
            <input
              type="file"
              ref={postFileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: 'none' }}
            />
            <button className="upload-video-btn">
              <Video size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Create Post */}
      <div className="create-post-card">
        <div className="post-user-info">
          <div className="user-avatar">
            <span className="avatar-initial">{user?.name?.charAt(0) || "U"}</span>
          </div>
          <div className="user-details">
            <h4 className="user-name">{user?.name || "You"}</h4>
            <span className="user-type">
              {user?.userType ? user.userType.replace('-', ' ').toUpperCase() : "MEMBER"}
            </span>
          </div>
        </div>
        
        <div className="post-content-area">
          <textarea
            placeholder={`Share your ${postTypeOptions.find(opt => opt.value === postType)?.label?.toLowerCase() || 'thoughts'}... (Max 1000 characters)`}
            value={newPost}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                setNewPost(e.target.value);
              }
            }}
            className="post-input"
            rows={4}
            maxLength={1000}
          />
          <div className="char-count">
            {newPost.length}/1000 characters
          </div>
          
          {selectedImage && (
            <div className="selected-image-preview">
              <img src={selectedImage} alt="Selected" className="preview-image" />
              <button 
                className="remove-image-btn"
                onClick={() => setSelectedImage(null)}
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="post-actions">
            <div className="post-type-indicator">
              <span className="type-badge">
                {postTypeOptions.find(opt => opt.value === postType)?.icon || "📝"} 
                {postTypeOptions.find(opt => opt.value === postType)?.label || postType.toUpperCase()}
              </span>
            </div>
            <button 
              className="post-submit-btn"
              onClick={handleNewPost}
              disabled={!newPost.trim() && !selectedImage}
            >
              <SendHorizontal size={20} />
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="posts-feed">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-user">
                <div className="post-avatar">
                  <span className="post-avatar-icon">{post.icon}</span>
                  {post.verified && (
                    <div className="verified-badge">
                      <ShieldCheck size={12} />
                    </div>
                  )}
                </div>
                <div className="post-user-info">
                  <h4 className="post-username">{post.user}</h4>
                  <div className="post-user-details">
                    <span className="post-user-role">{post.role}</span>
                    <span className="post-type-tag">{post.postType}</span>
                  </div>
                </div>
              </div>
              <div className="post-timestamp">
                <Clock size={14} />
                <span>{post.timestamp}</span>
              </div>
            </div>
            
            <div className="post-content">
              <p>{post.content}</p>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt="Post content" />
                </div>
              )}
            </div>
            
            <div className="post-stats">
              <div className="post-stat">
                <Heart size={16} />
                <span>{post.likes} likes</span>
              </div>
              <div className="post-stat">
                <MessageSquare size={16} />
                <span>{post.comments.length} comments</span>
              </div>
              <div className="post-stat">
                <Share2 size={16} />
                <span>{post.shares} shares</span>
              </div>
            </div>
            
            <div className="post-actions">
              <button 
                className="post-action-btn"
                onClick={() => handleLikePost(post.id)}
              >
                <ThumbsUp size={18} />
                <span>Like</span>
              </button>
              <button className="post-action-btn">
                <MessageSquare size={18} />
                <span>Comment</span>
              </button>
              <button className="post-action-btn">
                <Share2 size={18} />
                <span>Share</span>
              </button>
              <button className="post-action-btn">
                <Bookmark size={18} />
              </button>
            </div>
            
            {/* Comments Section */}
            <div className="post-comments">
              <div className="comments-header">
                <span className="comments-title">Comments ({post.comments.length})</span>
                {post.allowComments ? (
                  <span className="comments-note">Only employers & organizations can comment</span>
                ) : (
                  <span className="comments-note">Comments disabled</span>
                )}
              </div>
              
              {post.comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">
                    <span className="avatar-initial-small">{comment.user.charAt(0)}</span>
                    {comment.verified && (
                      <div className="comment-verified">
                        <ShieldCheck size={10} />
                      </div>
                    )}
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user}</span>
                      {comment.userType && (
                        <span className="comment-user-type">{comment.userType.toUpperCase()}</span>
                      )}
                      <span className="comment-time">{comment.timestamp}</span>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                </div>
              ))}
              
              {post.allowComments && (
                <div className="add-comment-section">
                  <div className="comment-avatar-small">
                    <span className="avatar-initial-small">{user?.name?.charAt(0) || "U"}</span>
                  </div>
                  <div className="comment-input-container">
                    <input
                      type="text"
                      placeholder="Add a comment as an employer or organization..."
                      className="comment-input"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          handleAddComment(post.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button 
                      className="comment-submit-btn"
                      onClick={(e) => {
                        const input = e.target.closest('.comment-input-container').querySelector('.comment-input');
                        if (input.value.trim()) {
                          handleAddComment(post.id, input.value);
                          input.value = '';
                        }
                      }}
                    >
                      <SendHorizontal size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeTab;