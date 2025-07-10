# Tillu AI POS System - Deployment Guide

## 🚀 Production Deployment

### Prerequisites

- Docker & Docker Compose
- Domain name with DNS configured
- SSL certificates (Let's Encrypt recommended)
- Server with minimum 4GB RAM, 2 CPU cores

### Environment Setup

1. **Create production environment file**
   ```bash
   cp apps/api-gateway/.env.example .env.production
   ```

2. **Configure production variables**
   ```bash
   # Database Configuration
   DB_HOST=postgres
   DB_PORT=5432
   DB_USERNAME=tillu_user
   DB_PASSWORD=secure_password_here
   DB_NAME=tillu_pos_prod

   # Redis Configuration
   REDIS_HOST=redis
   REDIS_PORT=6379

   # Security
   JWT_SECRET=super-secure-jwt-secret-256-bits
   ENCRYPTION_KEY=encryption-key-256-bits

   # External Services
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   SENDGRID_API_KEY=your_sendgrid_key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   OPENAI_API_KEY=your_openai_key
   ```

### Deployment Steps

1. **Clone repository on server**
   ```bash
   git clone https://github.com/qaisar92/tillu.git
   cd tillu
   ```

2. **Build and deploy**
   ```bash
   # Load environment variables
   export $(cat .env.production | xargs)
   
   # Deploy with production compose
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Verify deployment**
   ```bash
   # Check all services are running
   docker-compose -f docker-compose.prod.yml ps
   
   # Check logs
   docker-compose -f docker-compose.prod.yml logs -f
   ```

### Domain Configuration

Update your DNS records:
```
A     tillu.com           -> YOUR_SERVER_IP
A     api.tillu.com       -> YOUR_SERVER_IP
A     manager.tillu.com   -> YOUR_SERVER_IP
A     kitchen.tillu.com   -> YOUR_SERVER_IP
A     pos.tillu.com       -> YOUR_SERVER_IP
```

### SSL Certificate Setup

The production setup includes automatic SSL certificate generation via Let's Encrypt through Traefik.

### Health Checks

Monitor your deployment:
- API Health: https://api.tillu.com/api/v1/health
- Traefik Dashboard: http://YOUR_SERVER_IP:8080

### Backup Strategy

1. **Database Backup**
   ```bash
   docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U tillu_user tillu_pos_prod > backup.sql
   ```

2. **Redis Backup**
   ```bash
   docker-compose -f docker-compose.prod.yml exec redis redis-cli BGSAVE
   ```

### Scaling

To scale individual services:
```bash
# Scale API Gateway
docker-compose -f docker-compose.prod.yml up -d --scale api-gateway=3

# Scale frontend applications
docker-compose -f docker-compose.prod.yml up -d --scale customer-pwa=2
```

### Monitoring

Set up monitoring with:
- Application logs via Docker logs
- Database monitoring via PostgreSQL metrics
- Redis monitoring via Redis metrics
- Custom application metrics via /api/v1/metrics endpoint

### Security Checklist

- [ ] Change default passwords
- [ ] Configure firewall (only ports 80, 443, 22 open)
- [ ] Enable fail2ban
- [ ] Regular security updates
- [ ] Backup encryption
- [ ] Monitor access logs
- [ ] Set up intrusion detection

### Troubleshooting

**Common Issues:**

1. **Services not starting**
   ```bash
   # Check logs
   docker-compose -f docker-compose.prod.yml logs service-name
   
   # Restart specific service
   docker-compose -f docker-compose.prod.yml restart service-name
   ```

2. **Database connection issues**
   ```bash
   # Check database is running
   docker-compose -f docker-compose.prod.yml exec postgres pg_isready
   
   # Check connection from API
   docker-compose -f docker-compose.prod.yml exec api-gateway npm run db:check
   ```

3. **SSL certificate issues**
   ```bash
   # Check Traefik logs
   docker-compose -f docker-compose.prod.yml logs traefik
   
   # Verify domain DNS
   nslookup api.tillu.com
   ```

### Performance Optimization

1. **Database Optimization**
   - Enable connection pooling
   - Configure appropriate indexes
   - Regular VACUUM and ANALYZE

2. **Redis Optimization**
   - Configure memory limits
   - Enable persistence
   - Monitor memory usage

3. **Application Optimization**
   - Enable gzip compression
   - Configure caching headers
   - Optimize bundle sizes

### Maintenance

**Regular Tasks:**
- Weekly database backups
- Monthly security updates
- Quarterly performance reviews
- Log rotation and cleanup

**Update Process:**
1. Backup current deployment
2. Pull latest code
3. Build new images
4. Deploy with zero-downtime strategy
5. Verify functionality
6. Monitor for issues

---

For additional support, contact the development team or create an issue on GitHub.
