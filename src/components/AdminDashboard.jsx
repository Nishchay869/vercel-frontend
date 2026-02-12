import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  CheckCircle,
  Clock,
  Trash2,
  Edit3,
  X,
  Search,
  Filter,
  ChevronDown,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import "./Admin.css";

export default function AdminDashboard() {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingRequest, setEditingRequest] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    request: "",
    status: "pending",
    isAnonymous: false,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:3001/api";
  const token = localStorage.getItem("adminToken");

  // Fetch prayer requests
  const fetchPrayerRequests = useCallback(async () => {
    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/prayer-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        handleLogout();
        return;
      }

      const data = await response.json();
      setPrayerRequests(data);
      setError("");
    } catch (err) {
      setError("Failed to load prayer requests");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPrayerRequests();
  }, [fetchPrayerRequests]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin");
  };

  // Handle update request
  const handleUpdateRequest = async (id) => {
    try {
      const response = await fetch(`${API_URL}/prayer-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        fetchPrayerRequests();
        setEditingRequest(null);
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Handle delete request
  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`${API_URL}/prayer-requests/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchPrayerRequests();
        setDeleteConfirm(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Toggle anonymous visibility
  const toggleAnonymous = async (request) => {
    const updatedName = request.isAnonymous ? "Anonymous" : request.name;
    try {
      const response = await fetch(`${API_URL}/prayer-requests/${request.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...request,
          name: updatedName,
          isAnonymous: !request.isAnonymous,
        }),
      });

      if (response.ok) {
        fetchPrayerRequests();
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  // Filter and search requests
  const filteredRequests = prayerRequests.filter((req) => {
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.request.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { icon: Clock, color: "pending" },
      answered: { icon: CheckCircle, color: "answered" },
    };
    const { icon: Icon, color } = config[status] || config.pending;
    return (
      <span className={`admin-status-badge admin-status-${color}`}>
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="admin-dashboard-page">
      {/* Header */}
      <header className="admin-dashboard-header">
        <div className="admin-header-left">
          <h1 className="admin-dashboard-title">Prayer Request Management</h1>
          <p className="admin-dashboard-subtitle">
            {prayerRequests.length} total requests
          </p>
        </div>
        <div className="admin-header-right">
          <button
            onClick={fetchPrayerRequests}
            className="admin-header-btn"
            title="Refresh"
          >
            <RefreshCw size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="admin-header-btn admin-logout-btn"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="admin-filters">
        <div className="admin-search-wrapper">
          <Search size={20} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>
        <div className="admin-filter-wrapper">
          <Filter size={20} className="admin-filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="answered">Answered</option>
          </select>
          <ChevronDown size={20} className="admin-select-arrow" />
        </div>
      </div>

      {/* Content */}
      {error && <div className="admin-error-banner">{error}</div>}

      {isLoading ? (
        <div className="admin-loading">
          <div className="admin-spinner-lg"></div>
          <p>Loading prayer requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="admin-empty-state">
          <p>No prayer requests found</p>
        </div>
      ) : (
        <div className="admin-requests-grid">
          <AnimatePresence>
            {filteredRequests.map((req) => (
              <motion.div
                key={req.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="admin-request-card"
              >
                <div className="admin-card-header">
                  <div className="admin-card-meta">
                    <span className="admin-request-name">
                      {req.isAnonymous ? "Anonymous" : req.name}
                    </span>
                    <span className="admin-request-date">
                      {formatDate(req.createdAt)}
                    </span>
                  </div>
                  {getStatusBadge(req.status)}
                </div>

                <p className="admin-request-text">"{req.request}"</p>

                <div className="admin-card-actions">
                  <button
                    onClick={() => {
                      setEditingRequest(req.id);
                      setEditForm({
                        name: req.name,
                        request: req.request,
                        status: req.status,
                        isAnonymous: req.isAnonymous,
                      });
                    }}
                    className="admin-action-btn admin-edit-btn"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(req.id)}
                    className="admin-action-btn admin-delete-btn"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="admin-modal-overlay"
            onClick={() => setEditingRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <h3>Edit Prayer Request</h3>
                <button
                  onClick={() => setEditingRequest(null)}
                  className="admin-modal-close"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="admin-modal-input"
                    disabled={editForm.isAnonymous}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Prayer Request</label>
                  <textarea
                    value={editForm.request}
                    onChange={(e) =>
                      setEditForm({ ...editForm, request: e.target.value })
                    }
                    className="admin-modal-textarea"
                    rows={4}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                    className="admin-modal-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="answered">Answered</option>
                  </select>
                </div>

                <div className="admin-modal-actions">
                  <button
                    onClick={() => setEditingRequest(null)}
                    className="admin-modal-btn admin-modal-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateRequest(editingRequest)}
                    className="admin-modal-btn admin-modal-btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="admin-modal-overlay"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-modal admin-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <h3>Confirm Delete</h3>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="admin-modal-close"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="admin-modal-body">
                <p className="admin-delete-message">
                  Are you sure you want to delete this prayer request? This
                  action cannot be undone.
                </p>

                <div className="admin-modal-actions">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="admin-modal-btn admin-modal-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(deleteConfirm)}
                    className="admin-modal-btn admin-modal-btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
