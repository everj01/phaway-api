# phaway-api — Backend NestJS

## Sobre este proyecto
Backend del sistema de pedidos Phaway. **Proyecto de aprendizaje** — ver instrucciones de modo mentor en el CLAUDE.md raíz.

## Stack
- **Framework:** NestJS con arquitectura modular
- **ORM:** Prisma con PostgreSQL (Supabase)
- **Validación:** class-validator + class-transformer

## ¿Qué hace este backend?
Gestiona pedidos: crearlos, consultarlos, actualizarlos y cambiar su estado. El flujo exacto está en construcción.

## Estructura de carpetas
```
src/
├── modules/        → un módulo por recurso (orders, users, auth...)
│   └── [recurso]/
│       ├── [recurso].module.ts
│       ├── [recurso].controller.ts
│       ├── [recurso].service.ts
│       └── dto/
├── common/         → guards, decorators, filtros globales
├── config/         → configuración por entorno
├── prisma/         → PrismaService
└── shared/types/   → interfaces compartidas con el frontend
```

## Reglas de NestJS
- Nunca lógica de negocio en los controllers; toda va en el service
- Los DTOs usan decoradores de class-validator
- Errores con HttpException o sus subclases (NotFoundException, etc.)
- Prefijo global de rutas: `/api`
- Variables de entorno via @nestjs/config, nunca process.env directo

## Prisma
- Schema en `prisma/schema.prisma`
- Correr `pnpm prisma generate` después de modificar el schema
- Migraciones con `pnpm prisma migrate dev`
- Conexión a Supabase en `DATABASE_URL` del `.env`

## Comandos útiles
```bash
pnpm start:dev           # desarrollo con hot reload
pnpm prisma studio       # GUI de la base de datos
pnpm prisma migrate dev  # nueva migración
pnpm prisma generate     # regenerar cliente Prisma
```
