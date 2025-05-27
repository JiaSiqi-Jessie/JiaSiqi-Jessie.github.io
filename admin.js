// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    loadExistingData();
    setupFormHandlers();
});

// Initialize admin panel functionality
function initializeAdminPanel() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            const targetTab = document.getElementById(btn.dataset.tab + '-tab');
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

// Data storage using localStorage simulation (for GitHub Pages)
let siteData = {
    news: [
        {
            id: 1,
            date: '2025.01',
            content: 'Awarded HKU SEED Fund for Basic Research for project on thermal environment assessment'
        },
        {
            id: 2,
            date: '2024.12',
            content: 'New paper published in <em>Energy and Buildings</em> on global cooling potentials of green roofs'
        },
        {
            id: 3,
            date: '2024.08',
            content: 'Started position as Research Assistant Professor at HKU'
        },
        {
            id: 4,
            date: '2024.06',
            content: 'Selected for Shanghai Magnolia Program'
        }
    ],
    publications: [
        {
            id: 1,
            title: 'A hybrid framework for assessing outdoor thermal comfort in large-scale urban environments',
            authors: 'Jia, S., Wang, Y., Wong, N. H., & Weng, Q.',
            venue: 'Landscape and Urban Planning',
            year: 2025,
            status: 'published'
        },
        {
            id: 2,
            title: 'Global investigation of pedestrian-level cooling and energy-saving potentials of green and cool roofs in 43 megacities',
            authors: 'Jia, S., Weng, Q., Yoo, C., & Voogt, J. A.',
            venue: 'Energy and Buildings',
            year: 2025,
            status: 'published'
        }
    ],
    research: [
        {
            id: 1,
            title: 'HKU SEED Fund: AI-Based Thermal Environment Assessment',
            duration: '2025 - Present',
            funding: 'HKU SEED Fund for Basic Research',
            description: 'Developing advanced AI-based frameworks for thermal environment assessment and prediction.'
        }
    ],
    recruitment: {
        status: 'active',
        note: 'Actively recruiting for multiple positions'
    },
    profile: {
        email: 'siqijia@hku.hk',
        phone: '+852 6701 7174',
        address: 'Room 609, 6/F, Knowles Building\nThe University of Hong Kong, Hong Kong',
        bio: 'I am a Research Assistant Professor at The University of Hong Kong, specializing in urban environmental sustainability and climate adaptation.'
    }
};

// Load existing data into admin forms
function loadExistingData() {
    // Load news
    updateNewsListAdmin();
    
    // Load publications
    updatePublicationsListAdmin();
    
    // Load profile data
    document.getElementById('profile-email').value = siteData.profile.email;
    document.getElementById('profile-phone').value = siteData.profile.phone;
    document.getElementById('profile-address').value = siteData.profile.address;
    document.getElementById('profile-bio').value = siteData.profile.bio;
    
    // Load recruitment status
    document.getElementById('recruitment-status').value = siteData.recruitment.status;
    document.getElementById('recruitment-note').value = siteData.recruitment.note;
}

// Update news list in admin panel
function updateNewsListAdmin() {
    const newsList = document.getElementById('news-list-admin');
    if (newsList) {
        newsList.innerHTML = siteData.news.map(item => `
            <div class="admin-item">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <strong>${item.date}</strong>
                        <p>${item.content}</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="editNews(${item.id})" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteNews(${item.id})" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Update publications list in admin panel
function updatePublicationsListAdmin() {
    const pubsList = document.getElementById('publications-list-admin');
    if (pubsList) {
        pubsList.innerHTML = siteData.publications.map(item => `
            <div class="admin-item">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <strong>${item.title}</strong>
                        <p>${item.authors}</p>
                        <p><em>${item.venue}</em> (${item.year}) - ${item.status}</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="editPublication(${item.id})" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deletePublication(${item.id})" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Setup form handlers
function setupFormHandlers() {
    // News form
    const newsForm = document.getElementById('news-form');
    if (newsForm) {
        newsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const date = document.getElementById('news-date').value;
            const content = document.getElementById('news-content').value;
            
            if (date && content) {
                const newNews = {
                    id: Date.now(),
                    date: date,
                    content: content
                };
                
                siteData.news.unshift(newNews);
                updateNewsListAdmin();
                updateMainSiteNews();
                newsForm.reset();
                
                showNotification('News item added successfully!', 'success');
            }
        });
    }
    
    // Publication form
    const pubForm = document.getElementById('publication-form');
    if (pubForm) {
        pubForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('pub-title').value;
            const authors = document.getElementById('pub-authors').value;
            const venue = document.getElementById('pub-venue').value;
            const year = document.getElementById('pub-year').value;
            const status = document.getElementById('pub-status').value;
            
            if (title && authors && venue && year) {
                const newPub = {
                    id: Date.now(),
                    title: title,
                    authors: authors,
                    venue: venue,
                    year: parseInt(year),
                    status: status
                };
                
                siteData.publications.unshift(newPub);
                updatePublicationsListAdmin();
                pubForm.reset();
                
                showNotification('Publication added successfully!', 'success');
            }
        });
    }
    
    // Research form
    const researchForm = document.getElementById('research-form');
    if (researchForm) {
        researchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('project-title').value;
            const duration = document.getElementById('project-duration').value;
            const funding = document.getElementById('project-funding').value;
            const description = document.getElementById('project-description').value;
            
            if (title && duration && funding && description) {
                const newProject = {
                    id: Date.now(),
                    title: title,
                    duration: duration,
                    funding: funding,
                    description: description
                };
                
                siteData.research.unshift(newProject);
                researchForm.reset();
                
                showNotification('Research project added successfully!', 'success');
            }
        });
    }
    
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            siteData.profile.email = document.getElementById('profile-email').value;
            siteData.profile.phone = document.getElementById('profile-phone').value;
            siteData.profile.address = document.getElementById('profile-address').value;
            siteData.profile.bio = document.getElementById('profile-bio').value;
            
            showNotification('Profile updated successfully!', 'success');
        });
    }
    
    // Recruitment form
    const recruitmentForm = document.getElementById('recruitment-form');
    if (recruitmentForm) {
        recruitmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            siteData.recruitment.status = document.getElementById('recruitment-status').value;
            siteData.recruitment.note = document.getElementById('recruitment-note').value;
            
            showNotification('Recruitment status updated successfully!', 'success');
        });
    }
}

// Update main site news (simulated)
function updateMainSiteNews() {
    // In a real implementation, this would update the main site
    // For now, we'll update the news data in the main script
    if (window.siteUtils) {
        window.siteUtils.newsData = siteData.news.map(item => ({
            date: item.date,
            content: item.content
        }));
        window.siteUtils.updateNewsDisplay();
    }
}

// News management functions
function addNews() {
    document.getElementById('news-date').focus();
}

function editNews(id) {
    const news = siteData.news.find(item => item.id === id);
    if (news) {
        document.getElementById('news-date').value = news.date;
        document.getElementById('news-content').value = news.content;
        
        // Remove the original item
        siteData.news = siteData.news.filter(item => item.id !== id);
        updateNewsListAdmin();
        
        showNotification('News item loaded for editing', 'info');
    }
}

function deleteNews(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        siteData.news = siteData.news.filter(item => item.id !== id);
        updateNewsListAdmin();
        updateMainSiteNews();
        
        showNotification('News item deleted successfully!', 'success');
    }
}

// Publication management functions
function addPublication() {
    document.getElementById('pub-title').focus();
}

function editPublication(id) {
    const pub = siteData.publications.find(item => item.id === id);
    if (pub) {
        document.getElementById('pub-title').value = pub.title;
        document.getElementById('pub-authors').value = pub.authors;
        document.getElementById('pub-venue').value = pub.venue;
        document.getElementById('pub-year').value = pub.year;
        document.getElementById('pub-status').value = pub.status;
        
        // Remove the original item
        siteData.publications = siteData.publications.filter(item => item.id !== id);
        updatePublicationsListAdmin();
        
        showNotification('Publication loaded for editing', 'info');
    }
}

function deletePublication(id) {
    if (confirm('Are you sure you want to delete this publication?')) {
        siteData.publications = siteData.publications.filter(item => item.id !== id);
        updatePublicationsListAdmin();
        
        showNotification('Publication deleted successfully!', 'success');
    }
}

// Research project management
function addResearchProject() {
    document.getElementById('project-title').focus();
}

// Quick action functions
function exportData() {
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-data.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Data exported successfully!', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedData = JSON.parse(e.target.result);
                    siteData = importedData;
                    loadExistingData();
                    showNotification('Data imported successfully!', 'success');
                } catch (error) {
                    showNotification('Error importing data: Invalid JSON file', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

function previewSite() {
    window.open('index.html', '_blank');
}

function backupData() {
    // Simulate backup to localStorage
    localStorage.setItem('website-backup', JSON.stringify(siteData));
    showNotification('Data backed up successfully!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                               type === 'error' ? 'exclamation-circle' : 
                               'info-circle'}"></i>
            ${message}
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(39, 174, 96, 0.9)' : 
                    type === 'error' ? 'rgba(231, 76, 60, 0.9)' : 
                    'rgba(52, 152, 219, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for admin buttons
const adminStyles = `
    .edit-btn, .delete-btn {
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        padding: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #34495e;
    }
    
    .edit-btn:hover {
        background: rgba(52, 152, 219, 0.2);
        border-color: #3498db;
        color: #3498db;
    }
    
    .delete-btn:hover {
        background: rgba(231, 76, 60, 0.2);
        border-color: #e74c3c;
        color: #e74c3c;
    }
    
    .admin-item {
        transition: all 0.3s ease;
    }
    
    .admin-item:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(5px);
    }
`;

// Add admin styles to head
const adminStyleSheet = document.createElement('style');
adminStyleSheet.textContent = adminStyles;
document.head.appendChild(adminStyleSheet);