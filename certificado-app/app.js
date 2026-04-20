// Aplicación de Solicitud de Certificado de Antecedentes Penales
const app = {
    // Estado de la aplicación
    state: {
        user: null,
        request: {},
        currentStep: 'step-login'
    },

    // Inicialización
    init() {
        this.bindEvents();
        console.log('Aplicación iniciada - Simulación de Certificado de Antecedentes Penales');
    },

    // Vincular eventos
    bindEvents() {
        // Formulario de Login
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Formulario de Solicitud
        document.getElementById('request-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRequest();
        });

        // Formulario de Pago
        document.getElementById('payment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePayment();
        });

        // Botón de descarga
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadCertificate();
        });

        // Botón de logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
    },

    // Manejar login
    handleLogin() {
        const dni = document.getElementById('dni').value;
        const password = document.getElementById('password').value;
        const birthdate = document.getElementById('birthdate').value;

        // Validación simulada (en producción iría a un backend)
        if (dni && password && birthdate) {
            // Simular validación exitosa
            this.state.user = {
                dni: dni.toUpperCase(),
                fullname: this.generateFakeName(dni),
                birthdate: birthdate
            };

            // Actualizar UI
            document.getElementById('user-name').textContent = this.state.user.fullname;
            document.getElementById('user-display').classList.remove('hidden');
            document.getElementById('logout-btn').classList.remove('hidden');

            // Pre-llenar formulario
            document.getElementById('fullname').value = this.state.user.fullname;
            document.getElementById('request-dni').value = this.state.user.dni;

            // Ir al siguiente paso
            this.goToStep('step-form');
        } else {
            alert('Por favor complete todos los campos');
        }
    },

    // Generar nombre falso basado en DNI para demo
    generateFakeName(dni) {
        const names = ['Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Carmen', 'Pedro', 'Isabel'];
        const surnames = ['García', 'Rodríguez', 'Martínez', 'López', 'González', 'Sánchez', 'Pérez', 'Fernández'];
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSurname1 = surnames[Math.floor(Math.random() * surnames.length)];
        const randomSurname2 = surnames[Math.floor(Math.random() * surnames.length)];
        
        return `${randomName} ${randomSurname1} ${randomSurname2}`;
    },

    // Manejar solicitud
    handleRequest() {
        const purpose = document.getElementById('purpose').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;

        if (purpose && address && email) {
            this.state.request = {
                purpose: purpose,
                address: address,
                email: email,
                requestDate: new Date().toISOString(),
                requestId: this.generateRequestId()
            };

            // Ir al paso de pago
            this.goToStep('step-payment');
        } else {
            alert('Por favor complete todos los campos');
        }
    },

    // Generar ID de solicitud único
    generateRequestId() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `CERT-${timestamp}-${random}`;
    },

    // Manejar pago
    handlePayment() {
        // Simular procesamiento de pago
        const btn = document.querySelector('.btn-pay');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

        // Simular delay de procesamiento
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
            
            // Ir a pantalla de procesamiento
            this.goToStep('step-processing');
            
            // Simular tiempo de generación del certificado
            setTimeout(() => {
                this.showSuccess();
            }, 3000);
        }, 1500);
    },

    // Mostrar éxito y generar certificado
    showSuccess() {
        this.goToStep('step-success');
        this.renderCertificate();
    },

    // Renderizar certificado HTML
    renderCertificate() {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const certHTML = `
            <div class="cert-header">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="cert-title">Certificado de Antecedentes Penales</div>
                <div style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                    Ministerio de Justicia - Registro Central de Penados
                </div>
            </div>
            
            <div class="cert-body">
                <p><strong>Código de Verificación:</strong> ${this.state.request.requestId}</p>
                <p><strong>Fecha de Emisión:</strong> ${formattedDate}</p>
                <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;">
                
                <p>El abajo firmante, Secretario del Registro Central de Penados y Rebeldes,</p>
                
                <p><strong>CERTIFICA:</strong></p>
                
                <p>Que consultados los antecedentes obrantes en este Registro Central a favor de:</p>
                
                <p><strong>Nombre:</strong> ${this.state.user.fullname}</p>
                <p><strong>DNI/NIE:</strong> ${this.state.user.dni}</p>
                <p><strong>Fecha de Nacimiento:</strong> ${this.formatDate(this.state.user.birthdate)}</p>
                
                <p>Resulta que <strong>NO TIENE ANTECEDENTES PENALES</strong> según los registros consultados.</p>
                
                <p><strong>Finalidad del certificado:</strong> ${this.state.request.purpose}</p>
                
                <p style="font-size: 0.85rem; color: #666; margin-top: 1.5rem;">
                    Este certificado se expide a petición del interesado para los fines que estime convenientes.
                    La presente certificación tiene una validez de 3 meses desde su fecha de emisión.
                </p>
            </div>
            
            <div class="cert-footer">
                <div class="cert-seal">
                    <i class="fas fa-star" style="font-size: 1.5rem;"></i><br>
                    REGISTRO<br>OFICIAL
                </div>
                <div>
                    <div class="cert-signature">
                        El Secretario<br>
                        <strong>Fdo. Registro Central</strong>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('cert-content').innerHTML = certHTML;
    },

    // Formatear fecha
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    },

    // Descargar certificado como PDF (simulado con impresión)
    downloadCertificate() {
        // En una aplicación real, usaríamos una librería como jsPDF o html2pdf
        // Aquí simulamos la descarga abriendo una ventana de impresión
        
        const certContent = document.getElementById('cert-content').innerHTML;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Certificado - ${this.state.request.requestId}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    body { 
                        font-family: 'Times New Roman', serif; 
                        padding: 40px; 
                        max-width: 800px; 
                        margin: 0 auto;
                        background: white;
                    }
                    .cert-header {
                        text-align: center;
                        border-bottom: 3px double #0056b3;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .cert-title {
                        font-size: 24px;
                        font-weight: bold;
                        color: #0056b3;
                        text-transform: uppercase;
                        margin: 10px 0;
                    }
                    .cert-body p {
                        margin: 15px 0;
                        line-height: 1.6;
                    }
                    .cert-footer {
                        margin-top: 60px;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                    }
                    .cert-signature {
                        border-top: 1px solid #333;
                        padding-top: 10px;
                        width: 250px;
                        text-align: center;
                    }
                    .cert-seal {
                        width: 100px;
                        height: 100px;
                        border: 4px double #0056b3;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #0056b3;
                        font-weight: bold;
                        font-size: 12px;
                        text-align: center;
                        transform: rotate(-15deg);
                    }
                    @media print {
                        body { padding: 20px; }
                        button { display: none; }
                    }
                </style>
            </head>
            <body>
                ${certContent}
                <div style="text-align: center; margin-top: 40px;">
                    <button onclick="window.print()" style="padding: 10px 20px; background: #0056b3; color: white; border: none; cursor: pointer; font-size: 16px;">
                        🖨️ Imprimir / Guardar como PDF
                    </button>
                </div>
                <script>
                    window.onload = function() {
                        // Auto-imprimir después de cargar (opcional)
                        // window.print();
                    };
                <\/script>
            </body>
            </html>
        `);
        printWindow.document.close();
    },

    // Navegar entre pasos
    goToStep(stepId) {
        // Ocultar todos los pasos
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            step.classList.add('hidden');
        });

        // Mostrar el paso actual
        const currentStep = document.getElementById(stepId);
        currentStep.classList.remove('hidden');
        currentStep.classList.add('active');

        this.state.currentStep = stepId;

        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Logout
    logout() {
        if (confirm('¿Está seguro de que desea cerrar sesión?')) {
            // Resetear estado
            this.state = {
                user: null,
                request: {},
                currentStep: 'step-login'
            };

            // Limpiar formularios
            document.getElementById('login-form').reset();
            document.getElementById('request-form').reset();
            document.getElementById('payment-form').reset();

            // Ocultar información de usuario
            document.getElementById('user-display').classList.add('hidden');
            document.getElementById('logout-btn').classList.add('hidden');

            // Volver al inicio
            this.goToStep('step-login');
        }
    }
};

// Iniciar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
