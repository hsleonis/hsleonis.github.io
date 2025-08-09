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
                this.projects = repos
                    .filter(repo => repo.name !== this.githubUsername + '.github.io')
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                    .map(repo => ({
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
                        const projTopics = project.topics || [];
                        switch (this.currentFilter) {
                            case 'javascript': return lang.includes('javascript') || lang.includes('typescript');
                            case 'python': return lang.includes('python');
                            case 'php': return lang.includes('html') || lang.includes('php');
                            case 'machine-learning': return lang.includes('jupyter notebook') || projTopics.includes('machine-learning');
                            case 'other': return !['javascript', 'typescript', 'python', 'html', 'php', 'jupyter notebook'].some(l => lang.includes(l));
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
                    container.innerHTML = `
                        <h3>PROJECT ANALYSIS</h3>
                        <div class="status">Select a project to view details</div>
                    `;
                    return;
                }

                container.innerHTML = `
                    <h3>PROJECT ANALYSIS: ${project.name}</h3>
                    
                    <div class="description-area">
                            <strong>DESCRIPTION:</strong><br><br>
                            ${project.description || 'No description available'}
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
                        <span class="label">LAST UPDATED:</span>
                        <span class="value">${project.updated ? project.updated.toLocaleDateString() : 'N/A'}</span>
                    </div>
                    ${project.size !== undefined ? `
                    <div class="detail-item">
                        <span class="label">REPOSITORY SIZE:</span>
                        <span class="value">${project.size} KB</span>
                    </div>
                    ` : ''}
                    ${project.topics && project.topics.length > 0 ? `
                    <div class="detail-item">
                        <span class="label">TOPICS:</span>
                        <span class="value">${project.topics.join(', ')}</span>
                    </div>
                    ` : ''}
                    <div class="links">
                        ${project.url ? `<a href="${project.url}" target="_blank">VIEW SOURCE CODE</a>` : ''}
                        ${project.homepage ? `<a href="${project.homepage}" target="_blank">LIVE DEMO</a>` : ''}
                        ${project.clone_url ? `<a href="${project.clone_url}" target="_blank">CLONE REPOSITORY</a>` : ''}
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
