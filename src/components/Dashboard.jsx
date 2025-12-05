import React, { useEffect, useState } from 'react'
import { UserDetailsApi } from '../services/Api'
import { isAuthenticated } from '../services/Auth'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/Dashboard.css'

const Dashboard = () => {
    const [user, setUser] = useState({email:"",name:"",localID:""})
    const [stats, setStats] = useState({projects: 3, tasks: 12, completed: 8})
    const [recentActivity, setRecentActivity] = useState([
        {id: 1, action: "Logged in", time: "10:30 AM", icon: "👤"},
        {id: 2, action: "Updated profile", time: "Yesterday", icon: "✏️"},
        {id: 3, action: "Created new project", time: "2 days ago", icon: "🚀"},
        {id: 4, action: "Completed task", time: "3 days ago", icon: "✅"},
    ])

    useEffect(() => {
        if(isAuthenticated()){
            UserDetailsApi().then((response)=>{
                setUser({
                    email:response.data.users[0].email,
                    name:response.data.users[0].displayName,
                    localID:response.data.users[0].localId,
                })
            })
        }
    }, [])

    if(!isAuthenticated()){
        return <Navigate to="/login" />
    }

    return (
    <>
        <Navbar/>
        <div className="dashboard-container">
            <main role="main" className="container">
                
                {/* Welcome Section */}
                <div className="dashboard-card mb-4">
                    <div className="dashboard-header">
                        <h3>Welcome to Your Dashboard</h3>
                    </div>
                    <div className="text-center">
                        {user.name && user.email && user.localID ? (
                            <div className="user-info">
                                <div className="avatar-circle mb-3">
                                    <span className="avatar-text">{user.name.charAt(0)}</span>
                                </div>
                                <h4 className="mb-3">Hello, <strong>{user.name}</strong>! 👋</h4>
                                <p>Your Email: <strong>{user.email}</strong></p>
                                <p className="text-muted small mt-2">User ID: {user.localID}</p>
                            </div>
                        ) : (
                            <div className="loading-spinner">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3">Loading your profile...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="row mb-4">
                    <div className="col-md-4 mb-3">
                        <div className="stat-card projects">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                <h4>{stats.projects}</h4>
                                <p>Active Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="stat-card tasks">
                            <div className="stat-icon">📝</div>
                            <div className="stat-content">
                                <h4>{stats.tasks}</h4>
                                <p>Total Tasks</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="stat-card completed">
                            <div className="stat-icon">🎯</div>
                            <div className="stat-content">
                                <h4>{stats.completed}</h4>
                                <p>Completed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="row">
                    {/* Recent Activity */}
                    <div className="col-lg-8 mb-4">
                        <div className="dashboard-card">
                            <h4 className="section-title">Recent Activity</h4>
                            <div className="activity-list">
                                {recentActivity.map(activity => (
                                    <div key={activity.id} className="activity-item">
                                        <div className="activity-icon">{activity.icon}</div>
                                        <div className="activity-content">
                                            <h6>{activity.action}</h6>
                                            <p className="text-muted">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="col-lg-4 mb-4">
                        <div className="dashboard-card">
                            <h4 className="section-title">Quick Actions</h4>
                            <div className="quick-actions">
                                <button className="action-btn new-project">
                                    <span className="action-icon">➕</span>
                                    <span>New Project</span>
                                </button>
                                <button className="action-btn view-tasks">
                                    <span className="action-icon">👁️</span>
                                    <span>View Tasks</span>
                                </button>
                                <button className="action-btn settings">
                                    <span className="action-icon">⚙️</span>
                                    <span>Settings</span>
                                </button>
                                <button className="action-btn help">
                                    <span className="action-icon">❓</span>
                                    <span>Help Center</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="dashboard-card mt-4">
                    <div className="text-center">
                        <p className="text-muted">
                            <i className="bi bi-info-circle me-2"></i>
                            Last login: Today at 10:30 AM • 
                            <span className="text-success ms-2">✔ Account Verified</span>
                        </p>
                    </div>
                </div>

            </main>
        </div>
    </>
    )
}

export default Dashboard