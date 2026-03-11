document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const reveal = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load

    // Project Data
    const projects = [
        // A2H Org
        { name: 'pockfy-system', desc: 'Personal Financial Control System (Backend: Go, Frontend: React/TS)', lang: 'Go', type: 'app', private: true, url: 'http://pockfy.a2hsolutions.com.br' },
        { name: 'sindicalizei-frontend', desc: 'Labor Union Management PWA (Next.js)', lang: 'JavaScript', type: 'app', private: true, url: '#' },
        { name: 'autopanel', desc: 'Centralized Services Hub for SEFAZ-MA (VM/K8s infra & app bootstrapping via DAS)', lang: 'None', type: 'devops', private: true, url: '#' },

        // Personal DevOps / Tools
        { name: 'devops-go-duplicate-detector', desc: 'Ferramenta para limpeza de disco no macOS removendo duplicações (Golang)', lang: 'Go', type: 'devops', private: false, url: 'https://github.com/nilsonvieira/devops-go-duplicate-detector' },
        { name: 'devops-provisioner-droplet-ansible-wildfly', desc: 'Ansible playbook para provisionar Wildfly na Digital Ocean', lang: 'Shell', type: 'devops', private: true, url: 'https://github.com/nilsonvieira/devops-provisioner-droplet-ansible-wildfly' },
        { name: 'devops-terraform-droplet-wildfly', desc: 'Terraform para provisionar droplets na digital ocean com Wildlfy', lang: 'Shell', type: 'devops', private: true, url: 'https://github.com/nilsonvieira/devops-terraform-droplet-wildfly' },
        { name: 'devops-go-vault-api', desc: 'API para comunicação direta com Hashicorp Vault, migração de segredos, conversão INI para JSON, etc.', lang: 'Go', type: 'devops', private: false, url: 'https://github.com/nilsonvieira/devops-go-vault-api' },
        { name: 'ansible-playbook-workstation-setup', desc: 'Ansible playbook para configurar toda a máquina Linux após a formatação', lang: 'Dockerfile', type: 'devops', private: false, url: 'https://github.com/nilsonvieira/ansible-playbook-workstation-setup' },
        { name: 'devops-archetype-golang', desc: 'Archetype Golang seguindo as melhores práticas de mercado', lang: 'Go', type: 'app', private: false, url: 'https://github.com/nilsonvieira/devops-archetype-golang' }
    ];

    const getLangColor = (lang) => {
        const _lang = (lang || 'None').toLowerCase();
        if (_lang === 'go') return 'bg-go';
        if (_lang === 'shell') return 'bg-shell';
        if (_lang === 'python') return 'bg-python';
        if (_lang === 'html') return 'bg-html';
        if (_lang === 'javascript') return 'bg-js';
        if (_lang === 'java') return 'bg-java';
        if (_lang === 'hcl' || _lang === 'terraform') return 'bg-hcl';
        return 'bg-none';
    };

    const container = document.getElementById('project-list-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const renderProjects = (filter) => {
        container.innerHTML = '';
        const filtered = projects.filter(p => filter === 'all' || p.type === filter);

        filtered.forEach(p => {
            const el = document.createElement('a');
            el.className = 'list-item glassmorphism';
            el.href = p.url;
            el.target = p.url === '#' ? '' : '_blank';
            el.style.textDecoration = 'none';

            const iconType = p.private ?
                '<i class="fa-solid fa-lock private-icon" title="Private"></i>' :
                '<i class="fa-solid fa-globe public-icon" title="Public"></i>';

            el.innerHTML = `
                <div class="list-content">
                    <div class="list-type-icon">${iconType}</div>
                    <div class="list-info">
                        <h4>${p.name}</h4>
                        <p>${p.desc}</p>
                    </div>
                </div>
                <div class="list-meta">
                    <span class="badge ${p.type === 'devops' ? 'badge-devops' : 'badge-app'}">${p.type === 'devops' ? 'DevOps' : 'App'}</span>
                    <div class="list-lang">
                        <span class="lang-dot ${getLangColor(p.lang)}"></span>
                        ${p.lang}
                    </div>
                </div>
            `;
            container.appendChild(el);
        });
    };

    renderProjects('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.dataset.filter);
        });
    });

});
