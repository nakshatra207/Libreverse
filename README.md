cat << 'EOF' > README.md
# 🌐 LibreVerse

**LibreVerse** is a free and open-source blogging and news-sharing platform focused on topics like **Linux**, **FOSS**, **cybersecurity**, and **community tech updates**. Built with modern web technologies and deployed using containerized DevOps workflows, LibreVerse empowers the community with a censorship-free space to share knowledge and news.

---

## 🚀 Tech Stack

### 🧩 Frontend
- React — Dynamic UI rendering
- TypeScript — Strong typing support
- Vite — Lightning-fast frontend tooling
- Tailwind CSS — Utility-first CSS framework

### ⚙️ DevOps & Deployment
- Docker — Containerized environment
- Kubernetes — Scalable container orchestration
- Minikube — Local K8s cluster setup
- kubectl — Kubernetes CLI

---

## 📦 Project Structure

\`\`\`
Libreverse/
├── public/                     # Static assets
├── src/                        # React source files
│   └── components/             # UI components
├── Dockerfile                  # Docker build config
├── libreverse-deployment.yaml # Kubernetes deployment config
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # NPM dependencies
└── deploy.sh                   # Bash script for full deployment
\`\`\`

---

## 📜 Deployment Script (Linux/macOS)

\`\`\`bash
bash deploy.sh
\`\`\`

This script will:
- Start Docker
- Start Minikube with Docker as driver
- Build the Docker image
- Apply Kubernetes deployment
- Forward port \`8081\` to your local machine

📍 Visit the app at: http://localhost:8081

---

## 💻 Run on Different Operating Systems

### 🐧 Linux
\`\`\`bash
sudo apt install docker.io kubectl minikube
sudo usermod -aG docker \$USER && newgrp docker
bash deploy.sh
\`\`\`

### 🍎 macOS
\`\`\`bash
brew install docker kubectl minikube
bash deploy.sh
\`\`\`

### 🪟 Windows (WSL2 Recommended)
\`\`\`bash
# Inside WSL (Ubuntu)
sudo apt install docker.io kubectl minikube
bash deploy.sh
\`\`\`

---

## 🔐 Security & DevOps Features
- Containerized builds (Docker)
- Local Kubernetes deployment (Minikube)
- Port-forwarding and deployment automation
- Future plans for CI/CD, Ingress + TLS, and OAuth

---

## 🤝 Contributing

1. Fork this repository
2. Clone your fork:
   \`\`\`bash
   git clone https://github.com/your-username/libreverse.git
   \`\`\`
3. Create your feature branch:
   \`\`\`bash
   git checkout -b feature/my-feature
   \`\`\`
4. Commit your changes and push:
   \`\`\`bash
   git commit -m "Add new feature"
   git push origin feature/my-feature
   \`\`\`
5. Open a Pull Request 🚀

---

## 📄 License

This project is licensed under the **GNU AGPLv3 License** — because **freedom matters**.

---

## 💬 About the Author

Created with ❤️ by **Nakshatra Mudgil** — a passionate FOSS enthusiast, Linux hacker, and developer on a mission to empower digital freedom.
EOF
