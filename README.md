# Add this section to your existing README.md

## 🐳 Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Quick Start
1. Clone the repository:
```bash
git clone https://github.com/yourusername/vaporwave-todo-llm.git
cd vaporwave-todo-llm
```

2. Deploy using script:
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

Or manually with Docker Compose:
```bash
docker-compose up --build -d
```

The application will be available at `http://localhost`

### Docker Commands

#### Start the application:
```bash
docker-compose up -d
```

#### Stop the application:
```bash
docker-compose down
```

#### View logs:
```bash
docker-compose logs -f
```

#### Rebuild and restart:
```bash
docker-compose up --build -d
```

### Configuration
- The application runs on port 80 by default
- Data is persisted using Docker volumes
- Nginx is configured with security headers and optimizations
- Static assets are cached for better performance

### Production Deployment
For production deployment, consider:
1. Using a reverse proxy (like Traefik or Nginx Proxy Manager)
2. Setting up SSL/TLS certificates
3. Configuring proper domain names
4. Setting up monitoring and logging
5. Implementing backup strategies

### Troubleshooting
If you encounter issues:
1. Check container logs: `docker-compose logs`
2. Verify container status: `docker-compose ps`
3. Ensure ports are not in use: `netstat -tulpn | grep 80`
4. Check nginx configuration: `docker-compose exec todo-app nginx -t`
