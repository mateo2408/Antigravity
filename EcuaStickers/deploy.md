---
description: Cómo publicar gratis en GitHub Pages
---

# Publicar Gratis con GitHub Pages

GitHub Pages es 100% gratuito para proyectos públicos y no te pedirá tarjeta de crédito.

## Pasos para publicar:

### 1. Preparar los archivos
Asegúrate de que tu archivo principal se llame `index.html` (ya lo tienes así).

### 2. Crear repositorio en GitHub
1.  Ve a [github.com/new](https://github.com/new).
2.  Nombre del repositorio: `ecuastickers` (o lo que prefieras).
3.  **Importante:** Selecciona **Public** (Público).
4.  No marques ninguna otra casilla (README, .gitignore, etc).
5.  Haz clic en **Create repository**.

### 3. Subir tu código (desde la terminal)
Abre la terminal en la carpeta de tu proyecto (`/Users/mateocisneros/Antigravity/EcuaStickers`) y ejecuta estos comandos uno por uno:

```bash
# 1. Inicializar Git
git init

# 2. Agregar tus archivos
git add .

# 3. Guardar los cambios
git commit -m "Versión inicial de EcuStickers"

# 4. Conectar con GitHub (Reemplaza TU-USUARIO con tu nombre de usuario de GitHub)
# Copia el comando que te da GitHub que empieza con "git remote add origin..."
# Ejemplo: git remote add origin https://github.com/TU-USUARIO/ecuastickers.git

# 5. Subir el código
git branch -M main
git push -u origin main
```

### 4. Activar el sitio
1.  En tu repositorio en GitHub, ve a la pestaña **Settings** (Configuración).
2.  En el menú de la izquierda, haz clic en **Pages**.
3.  En "Build and deployment" > "Branch", selecciona **main** y asegúrate que la carpeta sea **/(root)**.
4.  Haz clic en **Save**.

¡Listo! En unos minutos aparecerá un enlace en la parte superior de esa página (ej: `https://tu-usuario.github.io/ecuastickers/`).
