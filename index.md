<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HASAN SHAHRIAR</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Courier Prime', monospace;
            background: radial-gradient(circle at center, #001100 0%, #000800 100%);
            color: #00ff41;
            overflow-x: hidden;
            height: 100vh;
            position: relative;
        }

        /* CRT Screen Effect */
        body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 255, 65, 0.03) 2px,
                    rgba(0, 255, 65, 0.03) 4px
                );
            pointer-events: none;
            z-index: 1000;
        }

        /* Terminal Container */
        .terminal {
            position: relative;
            min-height: 100vh;
            padding: 20px;
            background: 
                radial-gradient(ellipse at center, rgba(0, 255, 65, 0.1) 0%, transparent 70%),
                linear-gradient(180deg, rgba(0, 50, 20, 0.1) 0%, rgba(0, 20, 10, 0.3) 100%);
            border: 2px solid #00ff41;
            margin: 10px;
            box-shadow: 
                0 0 20px rgba(0, 255, 65, 0.3),
                inset 0 0 20px rgba(0, 255, 65, 0.1);
            animation: flicker 0.15s infinite linear;
        }

        @keyframes flicker {
            0% { opacity: 1; }
            98% { opacity: 1; }
            99% { opacity: 0.98; }
            100% { opacity: 1; }
        }

        /* Header */
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #00ff41;
            margin-bottom: 20px;
            position: relative;
        }

        .header h1 {
            font-size: 2.5em;
            font-weight: 700;
            text-shadow: 0 0 10px #00ff41;
            margin-bottom: 10px;
            animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
            from { text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41; }
            to { text-shadow: 0 0 20px #00ff41, 0 0 30px #00ff41; }
        }

        .header .subtitle {
            font-size: 1.2em;
            color: #00aa33;
            margin-bottom: 10px;
        }

        .header .system-info {
            font-size: 0.9em;
            color: #006622;
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
        }

        /* Main Content */
        .main-content {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 20px;
            height: calc(100vh - 200px);
        }

        .project-area {
            border: 1px solid #00aa33;
            padding: 15px;
            background: rgba(0, 20, 10, 0.3);
            position: relative;
            overflow-y: auto;
        }

        .sidebar {
            border: 1px solid #00aa33;
            padding: 15px;
            background: rgba(0, 20, 10, 0.3);
            overflow-y: auto;
        }

        /* Category Filter */
        .filter-section {
            margin-bottom: 20px;
        }

        .filter-section h3 {
            color: #00ff41;
            margin-bottom: 10px;
            text-shadow: 0 0 5px #00ff41;
        }

        .filter-btn {
            display: block;
            width: 100%;
            margin: 5px 0;
            padding: 8px 12px;
            background: transparent;
            color: #00aa33;
            border: 1px solid #00aa33;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.3s;
        }

        .filter-btn:hover, .filter-btn.active {
            background: rgba(0, 255, 65, 0.1);
            color: #00ff41;
            border-color: #00ff41;
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
        }

        /* Data Source Toggle */
        .data-source {
            margin-bottom: 20px;
        }

        .data-source label {
            display: flex;
            align-items: center;
            margin: 10px 0;
            cursor: pointer;
            color: #00aa33;
        }

        .data-source input[type="radio"] {
            margin-right: 10px;
            accent-color: #00ff41;
        }

        .data-source input[type="text"] {
            width: 100%;
            padding: 8px;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid #00aa33;
            color: #00ff41;
            font-family: inherit;
            margin-top: 5px;
        }

        /* Project List */
        .project-list {
            max-height: calc(100% - 100px);
            overflow-y: auto;
        }

        .project-item {
            border: 1px solid #006622;
            margin: 10px 0;
            padding: 15px;
            cursor: pointer;
            transition: all 0.3s;
            background: rgba(0, 10, 5, 0.5);
        }

        .project-item:hover, .project-item.selected {
            border-color: #00ff41;
            background: rgba(0, 255, 65, 0.1);
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
        }

        .project-item h4 {
            color: #00ff41;
            margin-bottom: 5px;
            font-size: 1.1em;
        }

        .project-item .language {
            color: #00aa33;
            font-size: 0.9em;
            margin-bottom: 5px;
        }

        .project-item .description {
            color: #008833;
            font-size: 0.9em;
            line-height: 1.4;
        }

        /* Project Details */
        .project-details {
            padding: 20px 0;
        }

        .project-details h3 {
            color: #00ff41;
            margin-bottom: 15px;
            text-shadow: 0 0 5px #00ff41;
        }

        .project-details .detail-item {
            margin: 10px 0;
            padding: 5px 0;
            border-bottom: 1px solid #003311;
        }

        .project-details .label {
            color: #00aa33;
            font-weight: bold;
            display: inline-block;
            width: 120px;
        }

        .project-details .value {
            color: #00ff41;
        }

        .project-details .links {
            margin: 20px 0;
        }

        .project-details .links a {
            color: #00ff41;
            text-decoration: none;
            margin-right: 15px;
            padding: 5px 10px;
            border: 1px solid #00aa33;
            transition: all 0.3s;
        }

        .project-details .links a:hover {
            background: rgba(0, 255, 65, 0.1);
            border-color: #00ff41;
            box-shadow: 0 0 5px rgba(0, 255, 65, 0.3);
        }

        /* Status Messages */
        .status {
            text-align: center;
            padding: 20px;
            color: #00aa33;
        }

        .loading {
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .error {
            color: #ff4444;
            text-shadow: 0 0 5px #ff4444;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(0, 20, 10, 0.3);
        }

        ::-webkit-scrollbar-thumb {
            background: #00aa33;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #00ff41;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
                grid-template-rows: auto 1fr;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .header .system-info {
                flex-direction: column;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="terminal">
        <div class="header">
            <h1>CYBER_TERMINAL.EXE</h1>
            <div class="subtitle">SECURE ACCESS GRANTED - PROJECT DATABASE</div>
            <div class="system-info">
                <span>USER: DEVELOPER</span>
                <span id="timestamp">SYSTEM TIME: LOADING...</span>
                <span>STATUS: ONLINE</span>
            </div>
        </div>

        <div class="main-content">
            <div class="project-area">
                <div class="project-list" id="projectList">
                    <div class="status loading">
                        INITIALIZING SECURE CONNECTION...<br>
                        LOADING PROJECT DATABASE...
                    </div>
                </div>
            </div>

            <div class="sidebar">


                <div class="filter-section">
                    <h3>FILTER BY CATEGORY</h3>
                    <button class="filter-btn active" data-filter="all">ALL PROJECTS</button>
                    <button class="filter-btn" data-filter="javascript">JAVASCRIPT</button>
                    <button class="filter-btn" data-filter="python">PYTHON</button>
                    <button class="filter-btn" data-filter="html">HTML/CSS</button>
                    <button class="filter-btn" data-filter="cpp">C/C++</button>
                    <button class="filter-btn" data-filter="other">OTHER</button>
                </div>

                <div class="project-details" id="projectDetails">
                    <h3>PROJECT DETAILS</h3>
                    <div class="status">Select a project to view details</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        class HackerPortfolio {
            constructor() {
                // Set your GitHub username here
                this.githubUsername = 'hsleonis'; // Change this to your actual username
                
                this.projects = [];
                this.filteredProjects = [];
                this.selectedProject = null;
                this.currentFilter = 'all';
                
                this.init();
            }

            init() {
                this.updateTimestamp();
                setInterval(() => this.updateTimestamp(), 1000);
                
                this.setupEventListeners();
                this.detectGitHubUsername();
                this.loadProjects();
            }

            updateTimestamp() {
                const now = new Date();
                const timestamp = now.toISOString().replace('T', ' ').substr(0, 19);
                document.getElementById('timestamp').textContent = `SYSTEM TIME: ${timestamp}`;
            }

            detectGitHubUsername() {
                // Try to detect GitHub username from URL
                const hostname = window.location.hostname;
                if (hostname.includes('.github.io')) {
                    this.githubUsername = hostname.split('.')[0];
                }
            }

            setupEventListeners() {
                // Filter buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        e.target.classList.add('active');
                        this.currentFilter = e.target.dataset.filter;
                        this.filterProjects();
                    });
                });
            }

            async loadProjects() {
                this.showLoading();
                
                try {
                    // Load from GitHub API
                    await this.loadFromGitHub();
                    
                    // Try to load and concat from projects.json if available
                    try {
                        await this.loadFromJSON();
                    } catch (jsonError) {
                        // JSON file is optional, so we don't show error if it fails
                        console.log('No projects.json file found or error loading it:', jsonError.message);
                    }
                    
                    this.filterProjects();
                } catch (error) {
                    this.showError(`CONNECTION ERROR: ${error.message}`);
                }
            }

            async loadFromGitHub() {
                if (!this.githubUsername || this.githubUsername === 'your-github-username') {
                    throw new Error('Please set your GitHub username in the script');
                }

                const response = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=100`);
                
                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const repos = await response.json();
                this.projects = repos.map(repo => ({
                    name: repo.name,
                    description: repo.description || 'No description available',
                    language: repo.language || 'Unknown',
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    updated: new Date(repo.updated_at),
                    url: repo.html_url,
                    clone_url: repo.clone_url,
                    homepage: repo.homepage,
                    topics: repo.topics || [],
                    size: repo.size,
                    created: new Date(repo.created_at),
                    source: 'github'
                }));
            }

            async loadFromJSON() {
                const response = await fetch('projects.json');
                
                if (!response.ok) {
                    throw new Error(`Could not load projects.json`);
                }

                const data = await response.json();
                const jsonProjects = (data.projects || []).map(project => ({
                    ...project,
                    updated: project.updated ? new Date(project.updated) : new Date(),
                    created: project.created ? new Date(project.created) : new Date(),
                    source: 'json'
                }));
                
                // Concat JSON projects to existing GitHub projects
                this.projects = [...this.projects, ...jsonProjects];
            }

            filterProjects() {
                if (this.currentFilter === 'all') {
                    this.filteredProjects = [...this.projects];
                } else {
                    this.filteredProjects = this.projects.filter(project => {
                        const lang = project.language?.toLowerCase() || '';
                        switch (this.currentFilter) {
                            case 'javascript': return lang.includes('javascript') || lang.includes('typescript');
                            case 'python': return lang.includes('python');
                            case 'html': return lang.includes('html') || lang.includes('css');
                            case 'cpp': return lang.includes('c++') || lang.includes('c');
                            case 'other': return !['javascript', 'typescript', 'python', 'html', 'css', 'c++', 'c'].some(l => lang.includes(l));
                            default: return true;
                        }
                    });
                }
                this.renderProjects();
            }

            renderProjects() {
                const container = document.getElementById('projectList');
                
                if (this.filteredProjects.length === 0) {
                    container.innerHTML = '<div class="status">NO PROJECTS FOUND IN DATABASE</div>';
                    return;
                }

                container.innerHTML = this.filteredProjects.map((project, index) => `
                    <div class="project-item" data-index="${index}">
                        <h4>${project.name}</h4>
                        <div class="language">${project.language}</div>
                        <div class="description">${project.description}</div>
                    </div>
                `).join('');

                // Add click listeners
                container.querySelectorAll('.project-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        const index = parseInt(e.currentTarget.dataset.index);
                        this.selectProject(index);
                    });
                });
            }

            selectProject(index) {
                document.querySelectorAll('.project-item').forEach(item => item.classList.remove('selected'));
                document.querySelectorAll('.project-item')[index]?.classList.add('selected');
                
                this.selectedProject = this.filteredProjects[index];
                this.renderProjectDetails();
            }

            renderProjectDetails() {
                const container = document.getElementById('projectDetails');
                const project = this.selectedProject;

                if (!project) {
                    container.innerHTML = '<h3>PROJECT DETAILS</h3><div class="status">Select a project to view details</div>';
                    return;
                }

                container.innerHTML = `
                    <h3>PROJECT ANALYSIS</h3>
                    <div class="detail-item">
                        <span class="label">NAME:</span>
                        <span class="value">${project.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">LANGUAGE:</span>
                        <span class="value">${project.language}</span>
                    </div>
                    ${project.stars !== undefined ? `
                    <div class="detail-item">
                        <span class="label">STARS:</span>
                        <span class="value">${project.stars}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">FORKS:</span>
                        <span class="value">${project.forks}</span>
                    </div>
                    ` : ''}
                    <div class="detail-item">
                        <span class="label">UPDATED:</span>
                        <span class="value">${project.updated ? project.updated.toLocaleDateString() : 'N/A'}</span>
                    </div>
                    ${project.size !== undefined ? `
                    <div class="detail-item">
                        <span class="label">SIZE:</span>
                        <span class="value">${project.size} KB</span>
                    </div>
                    ` : ''}
                    <div class="links">
                        ${project.url ? `<a href="${project.url}" target="_blank">VIEW SOURCE</a>` : ''}
                        ${project.homepage ? `<a href="${project.homepage}" target="_blank">LIVE DEMO</a>` : ''}
                        ${project.clone_url ? `<a href="${project.clone_url}" target="_blank">CLONE</a>` : ''}
                    </div>
                `;
            }

            showLoading() {
                document.getElementById('projectList').innerHTML = 
                    '<div class="status loading">ACCESSING SECURE DATABASE...<br>DECRYPTING PROJECT FILES...</div>';
            }

            showError(message) {
                document.getElementById('projectList').innerHTML = 
                    `<div class="status error">SYSTEM ERROR:<br>${message}</div>`;
            }
        }

        // Initialize the portfolio
        new HackerPortfolio();
    </script>
</body>
</html>
