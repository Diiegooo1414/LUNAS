// js/lightbox.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CREAR EL HTML DEL MODAL DINÁMICAMENTE
    // Usamos clases de Tailwind directamente aquí para el estilo.
    const modalHTML = `
        <div id="lightbox-modal" class="fixed inset-0 z-50 hidden bg-black/90 flex justify-center items-center backdrop-blur-sm opacity-0 transition-opacity duration-300">
            <span id="lightbox-close" class="absolute top-5 right-8 text-white text-5xl font-bold cursor-pointer hover:text-gray-300 z-50">&times;</span>
            
            <img id="lightbox-img" class="max-w-[90%] max-h-[85vh] object-contain rounded-md shadow-2xl transform scale-95 transition-transform duration-300">
            
            <div id="lightbox-caption" class="absolute bottom-5 text-center text-gray-300 text-lg w-full px-4"></div>
        </div>
    `;

    // Insertar el modal al final del body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 2. REFERENCIAS A LOS ELEMENTOS CREADOS
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    // 3. FUNCIONES DE APERTURA Y CIERRE
    
    // Función para cerrar
    const closeModal = () => {
        // Efecto de desvanecimiento (Fade out)
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        modalImg.classList.remove('scale-100');
        modalImg.classList.add('scale-95');
        
        // Esperar a que termine la transición (300ms) para ocultar el div
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex'); // Quitamos flex al ocultar
        }, 300);
    };

    // Función para abrir
    const openModal = (src, alt, caption) => {
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Flex para centrar contenido
        
        // Pequeño timeout para permitir que el navegador renderice antes de la opacidad (para la animación)
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            modalImg.classList.remove('scale-95');
            modalImg.classList.add('scale-100');
        }, 10);

        modalImg.src = src;
        modalImg.alt = alt;
        captionText.textContent = caption || alt; // Si no hay caption, usa el ALT
    };

    // 4. ASIGNAR EVENTOS A LAS IMÁGENES
    // Buscamos todas las imágenes que tengan la clase 'zoomable'
    const images = document.querySelectorAll('.zoomable');

    images.forEach(img => {
        // Añadimos cursor de lupa automáticamente con Tailwind si no lo tienen
        img.classList.add('cursor-zoom-in'); 
        
        img.addEventListener('click', function() {
            // Intentamos buscar el texto del caption hermano (si existe)
            const nextSibling = this.nextElementSibling;
            let caption = "";
            
            // Verificamos si el siguiente elemento es un caption
            if (nextSibling && nextSibling.innerText) {
                caption = nextSibling.innerText;
            }

            openModal(this.src, this.alt, caption);
        });
    });

    // 5. EVENTOS DE CIERRE
    closeBtn.addEventListener('click', closeModal);

    // Cerrar al hacer clic fuera de la imagen (en el fondo oscuro)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});