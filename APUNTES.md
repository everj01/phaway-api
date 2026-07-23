# Apuntes de aprendizaje — phaway-api

Bitácora informal de cosas aprendidas/debuggeadas durante el desarrollo. No es documentación formal, son notas para no repetir errores.

## Prisma 7 + Supabase (PgBouncer) + NestJS — setup con dolor

Al conectar `PrismaService` por primera vez aparecieron 5 errores en cadena, todos por la arquitectura nueva de Prisma 7 (generador `prisma-client`, driver adapters, output local) combinada con el pooler de Supabase:

1. **`migrate status` colgado** → el `DATABASE_URL` (pooler modo transacción, puerto `6543`) no soporta los locks de sesión que necesita `migrate`. Fix: en `prisma.config.ts`, usar `DIRECT_URL` (modo sesión, puerto `5432`) como `datasource.url`.

2. **`PrismaService` sin conexión real** → el generador nuevo requiere un adapter explícito, ya no lee `DATABASE_URL` solo. Fix: `super({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })`.

3. **`exports is not defined in ES module scope`** → el cliente generado sale en ESM por defecto, pero el proyecto corre en CommonJS. Fix: `moduleFormat = "cjs"` en el bloque `generator` de `schema.prisma`, y `pnpm prisma generate` de nuevo.

4. **`Cannot find module '@prisma/client/runtime/client'`** → el cliente generado depende del paquete `@prisma/client` para el motor de queries, aunque nunca se importe directo. Fix: `pnpm add @prisma/client`.

5. **`SASL: client password must be a string`** → Nest no carga `.env` solo. Fix: `import 'dotenv/config'` como primer import de `main.ts`.

## Por qué los campos de sistema (`id`, `uuid`, `createdAt`...) no van en los DTOs

No es solo que "no hace falta validarlos" — es que el DTO funciona como **lista blanca** de lo que el cliente puede mandar. Si un campo no está declarado en el DTO, es imposible que el cliente lo controle, sin importar qué mande en el body. Agregar `id` al DTO sería un riesgo real (alguien podría intentar pisar un registro mandando un id específico).

## `PUT` vs `PATCH`

- `PUT` → reemplaza el recurso completo, se esperan todos los campos.
- `PATCH` → actualización parcial, solo los campos que cambian.

Usamos `PATCH` para `update` porque `UpdateProductDto` tiene todos los campos opcionales (`PartialType`).

## `!` en TypeScript vs decoradores de `class-validator`

Son dos capas independientes:
- `!` (definite assignment assertion) → solo le calla la boca a TypeScript en compilación, no afecta nada en runtime.
- `@IsNotEmpty()`, `@IsString()`, etc. → corren en runtime cuando llega una request real, vía el `ValidationPipe` de Nest.
