# Aplicación de Certificado de Antecedentes Penales

Aplicación web completa para la solicitud y descarga de certificados de antecedentes penales. Esta aplicación simula el proceso completo de identificación ciudadana, registro de solicitud, pago de tasas y generación del certificado.

## 📋 Características

### Flujo Completo del Usuario
1. **Validación de Identidad**: El ciudadano ingresa su DNI/NIE, contraseña y fecha de nacimiento
2. **Registro de Solicitud**: Completa los datos de la solicitud (finalidad, dirección, email)
3. **Pago de Tasas**: Simulación de pago con tarjeta de crédito (tasa: 3,50 €)
4. **Procesamiento**: Animación de carga mientras se genera el documento
5. **Descarga**: Visualización y descarga del certificado en formato PDF

### Funcionalidades Principales
- ✅ Sistema de autenticación simulado
- ✅ Formularios validados en cliente
- ✅ Generación dinámica de certificado con datos del usuario
- ✅ Código de verificación único por solicitud
- ✅ Diseño responsivo (móvil y escritorio)
- ✅ Interfaz moderna con animaciones CSS
- ✅ Opción de impresión/guardado como PDF

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y animaciones
- **JavaScript Vanilla**: Lógica de negocio sin dependencias externas
- **Font Awesome**: Iconografía
- **Print API**: Para la generación de PDFs

## 📁 Estructura del Proyecto

```
certificado-app/
├── index.html          # Estructura HTML principal
├── styles.css          # Hoja de estilos completa
├── app.js              # Lógica de la aplicación
└── README.md           # Documentación
```

## 💻 Uso

### Opción 1: Abrir directamente
Simplemente abre el archivo `index.html` en tu navegador web moderno.

### Opción 2: Servidor local (recomendado)
```bash
# Usando Python
cd certificado-app
python -m http.server 8000

# Usando Node.js (necesita http-server)
npx http-server -p 8000

# Luego abre en tu navegador:
http://localhost:8000
```

## 🧪 Datos de Prueba

Esta es una aplicación de demostración. Puedes usar **cualquier dato** para probar:

- **DNI**: Cualquier formato (ej: `12345678A`)
- **Contraseña**: Cualquier valor
- **Fecha de nacimiento**: Cualquier fecha válida
- **Tarjeta de crédito**: Cualquier número (simulado)

El sistema generará automáticamente un nombre aleatorio para el certificado.

## 🎨 Personalización

### Colores
Puedes modificar los colores en `styles.css`:

```css
:root {
    --primary-color: #0056b3;      /* Color principal */
    --secondary-color: #6c757d;    /* Color secundario */
    --success-color: #28a745;      /* Color de éxito */
    --bg-color: #f4f7f6;           /* Fondo */
}
```

### Tasa Administrativa
Modifica el precio en `index.html`:
```html
<strong>3,50 €</strong>
```

## 🔐 Consideraciones de Seguridad

⚠️ **IMPORTANTE**: Esta es una aplicación de **demostración**. En un entorno de producción real deberías implementar:

1. **Backend seguro**: Node.js, Python, Java, etc.
2. **Base de datos**: Para almacenar usuarios y solicitudes
3. **Autenticación real**: OAuth, JWT, o sistema gubernamental
4. **Pasarela de pago**: Stripe, PayPal, Redsys, etc.
5. **HTTPS**: Certificado SSL obligatorio
6. **Validación server-side**: Nunca confiar solo en validación del cliente
7. **Generación de PDF segura**: Librerías server-side como Puppeteer o wkhtmltopdf

## 📄 Formato del Certificado

El certificado generado incluye:
- Código de verificación único
- Fecha de emisión
- Nombre completo del solicitante
- DNI/NIE
- Fecha de nacimiento
- Finalidad del certificado
- Sello oficial simulado
- Firma digital simulada

## 🌐 Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Navegadores móviles (iOS/Android)

## 📝 Licencia

Este proyecto es de código abierto y está disponible para fines educativos y de demostración.

---

**Desarrollado como ejemplo de aplicación web gubernamental moderna**  
*Fecha de creación: 2026-04-21*
