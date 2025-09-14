# Cursor Guardrails

## 🚫 **NEVER MODIFY** (Builder.io owns these)

- `client/components/**` - All UI components
- `client/contexts/**` - React contexts
- `client/hooks/**` - Custom React hooks
- `client/global.css` - Global styles
- `.builder/**` - Builder.io cache
- `components.json` - Builder.io component registry
- `packages/ui-lib/**` - UI component library
- `packages/tokens/**` - Design tokens

## ✅ **ALLOWED TO MODIFY** (Engineering owns these)

- `client/lib/**` - Utility libraries
- `client/pages/**` - Page components (business logic only)
- `client/services/**` - API service layers
- `server/**` - Backend API and services
- `schema/**` - API contracts and schemas
- `infra/**` - Infrastructure as code
- `tools/**` - Development tools
- `.github/**` - CI/CD workflows
- `tests/**` - Test files

## 📋 **DEVELOPMENT RULES**

### 1. **API-First Development**

- All web→API calls MUST use generated client from `schema/openapi.yaml`
- NO raw fetch() calls allowed
- Update OpenAPI schema first, then regenerate client

### 2. **New Feature Workflow**

When Builder.io discovers new UI actions:

1. **Update OpenAPI schema** in `schema/openapi.yaml`
2. **Regenerate API client** using OpenAPI generator
3. **Add/extend MSW handlers** in `client/mocks/handlers.ts`
4. **Implement backend handlers** in `server/routes/`
5. **Add tests** for new endpoints
6. **Add database migrations** using expand→dual-write→backfill→switch→contract pattern
7. **Wire UI to client** (Builder.io handles this)
8. **Add observability** (OTEL + Sentry breadcrumbs)

### 3. **Quality Gates**

All changes must pass:

- `guard-ui` - Blocks UI file modifications
- `ci (checks)` - Linting, type checking, tests
- `ci (contract)` - OpenAPI validation
- `ci (migrate-dry-run)` - Database migration validation
- `ci (visual)` - Visual regression testing

### 4. **Code Standards**

- Use TypeScript strict mode
- Follow existing patterns in `server/` directory
- Add comprehensive error handling
- Include input validation using Zod schemas
- Write tests for all new functionality
- Document API changes in OpenAPI schema

### 5. **Security Requirements**

- All endpoints require authentication (JWT)
- Validate all inputs using Zod schemas
- Sanitize outputs to prevent XSS
- Use parameterized queries for database access
- Log security events for audit

### 6. **Performance Guidelines**

- Implement proper caching strategies
- Use database indexes for queries
- Optimize API response sizes
- Add rate limiting for public endpoints
- Monitor performance metrics

## 🔧 **Development Commands**

```bash
# Generate API client from OpenAPI schema
npm run generate:api-client

# Run tests
npm test

# Type check
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format.fix

# Start development server with mocks
npm run dev:mock
```

## 📚 **Resources**

- OpenAPI Schema: `schema/openapi.yaml`
- API Client: `client/lib/api-client.ts`
- Mock Handlers: `client/mocks/handlers.ts`
- Backend Routes: `server/routes/`
- Database Schema: `server/config/init.sql`

## 🚨 **Emergency Procedures**

If you need to modify UI files for critical fixes:

1. Create emergency branch: `git checkout -b emergency/ui-fix`
2. Make minimal changes to UI files
3. Document why UI modification was necessary
4. Get approval from design team
5. Merge with special approval process

Remember: **Builder.io owns the UI. Cursor owns the backend.**
