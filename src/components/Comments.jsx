import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Send, User, Clock } from "lucide-react";
import "./Comments.css";

let socket = null;

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentsEndRef = useRef(null);

  // Initialize socket connection once using useRef
  useEffect(() => {
    // Create socket connection only if it doesn't exist
    if (!socket) {
      socket = io("http://localhost:3001", {
        transports: ["websocket", "polling"],
      });
    }

    // Connection event handlers
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    // Listen for initial comments
    socket.on("initial-comments", (initialComments) => {
      setComments(initialComments);
    });

    // Listen for new comments in real-time
    socket.on("new-comment", (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("initial-comments");
      socket.off("new-comment");
      // Note: We don't disconnect here to preserve connection across re-renders
    };
  }, []);

  // Auto-scroll to new comments
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim() || !author.trim()) return;

    setIsSubmitting(true);

    // Emit the new comment to the server
    socket.emit("new-comment", {
      author: author.trim(),
      text: newComment.trim(),
    });

    setNewComment("");
    setIsSubmitting(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <section className="comments-section">
      <div className="comments-container">
        {/* Header */}
        <div className="comments-header">
          <h2 className="comments-title">Community Comments</h2>
          <div
            className={`connection-status ${isConnected ? "connected" : "disconnected"}`}
          >
            <span className="status-dot"></span>
            {isConnected ? "Live" : "Connecting..."}
          </div>
        </div>

        {/* Comments List */}
        <div className="comments-list">
          {comments.length === 0 ? (
            <div className="no-comments">
              <p>No comments yet. Be the first to share!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-bubble">
                <div className="comment-avatar">
                  <User size={20} />
                </div>
                <div className="comment-content">
                  <div className="comment-meta">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-time">
                      <Clock size={12} />
                      {formatTime(comment.timestamp)}
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="author-input"
              required
              maxLength={50}
            />
          </div>
          <div className="form-row">
            <textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
              required
              maxLength={500}
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim() || !author.trim()}
            className="submit-btn"
          >
            <Send size={18} />
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
