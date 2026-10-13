document.addEventListener("DOMContentLoaded", function() {
    
    
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function toggleMenu() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    }

    if(menuToggle && sidebar) {
        menuToggle.addEventListener('click', toggleMenu);
        closeSidebar.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    let autoPlayInterval;

    function updateCarousel() {
        if (items.length === 0) return;
        const totalItems = items.length;
        
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = totalItems - 1;
        
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalItems) nextIndex = 0;

        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === prevIndex) {
                item.classList.add('prev');
            } else if (index === nextIndex) {
                item.classList.add('next');
            } else {
                let diff = index - currentIndex;
                if (diff < 0) diff += totalItems; 
                
                if (diff > totalItems / 2) {
                    item.classList.add('hidden-left');
                } else {
                    item.classList.add('hidden-right');
                }
            }
        });
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= items.length) currentIndex = 0;
        updateCarousel();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000); 
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index !== currentIndex) {
                currentIndex = index; 
                updateCarousel();     
                stopAutoPlay();
                startAutoPlay();
            }
        });
    });

    updateCarousel();
    startAutoPlay();

    const carouselContainer = document.getElementById('main-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    
    const btnIngresa = document.getElementById('btn-ingresa');
    if(btnIngresa) {
        btnIngresa.addEventListener('click', function() {
            alert("Próximamente: ¡Aquí se abrirá el formulario para ofertas!");
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const carrusel = document.querySelector('.carrusel-deslizable');
    if (!carrusel) return; 

    let isHovered = false;
    let ultimaPosicion = -1;
    let intervaloCarrusel; 

    carrusel.addEventListener('mouseenter', () => isHovered = true);
    carrusel.addEventListener('mouseleave', () => isHovered = false);
    carrusel.addEventListener('touchstart', () => isHovered = true);
    carrusel.addEventListener('touchend', () => isHovered = false);

    function avanzarAutomatico() {
        if (!isHovered) {
            const item = carrusel.querySelector('.item-producto-simple');
            if (!item) return;
            const itemWidth = item.offsetWidth + 30; 
            
            if (Math.ceil(carrusel.scrollLeft) === ultimaPosicion) {
                carrusel.scrollTo({ left: 0, behavior: 'smooth' });
                ultimaPosicion = -1; 
            } else {
                ultimaPosicion = Math.ceil(carrusel.scrollLeft);
                carrusel.scrollBy({ left: itemWidth, behavior: 'smooth' });
            }
        }
    }

    function iniciarIntervalo() {
        intervaloCarrusel = setInterval(avanzarAutomatico, 2500);
    }
    iniciarIntervalo();

    window.moverCarrusel = function(direccion) {
        const item = carrusel.querySelector('.item-producto-simple');
        if (!item) return;
        const itemWidth = item.offsetWidth + 30;

        carrusel.scrollBy({ left: itemWidth * direccion, behavior: 'smooth' });
        ultimaPosicion = -1;
        clearInterval(intervaloCarrusel);
        iniciarIntervalo();
    };
});



function abrirModalProducto(rutaImagen, titulo, detalle) {
    document.getElementById('img-zoom-producto').src = rutaImagen;
    document.getElementById('titulo-zoom-producto').innerText = titulo;
    document.getElementById('detalle-zoom-producto').innerText = detalle;
    document.getElementById('modal-producto-frente').classList.add('mostrar');
}

function cerrarModalProducto() {
    document.getElementById('modal-producto-frente').classList.remove('mostrar');
}


document.addEventListener("DOMContentLoaded", function() {
    const elementosAAnimar = document.querySelectorAll('.animacion-oculta');

    const vigilanteScroll = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('animacion-visible');
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15 
    });

    elementosAAnimar.forEach(elemento => {
        vigilanteScroll.observe(elemento);
    });
});



document.addEventListener("DOMContentLoaded", function() {
    
    // Auto-reset al pasar el mouse por una nueva categoría
    const menuItems = document.querySelectorAll('.has-submenu');

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const panel = item.querySelector('.submenu-panel');
            if (!panel) return;

            panel.querySelectorAll('.vista-activa').forEach(vista => {
                vista.classList.remove('vista-activa');
                vista.classList.add('vista-oculta');
            });

            const listaInicial = panel.querySelector('[id^="vista-lista-"]');
            if (listaInicial) {
                listaInicial.classList.remove('vista-oculta');
                listaInicial.classList.add('vista-activa');
            }
        });
    });
});


window.mostrarCuadricula = function(idDestino) {
    const vistaDestino = document.getElementById('vista-cuadricula-' + idDestino);
    if (!vistaDestino) return;

    const panelPadre = vistaDestino.closest('.submenu-panel');
    
    panelPadre.querySelectorAll('.vista-activa').forEach(vista => {
        vista.classList.remove('vista-activa');
        vista.classList.add('vista-oculta');
    });

    vistaDestino.classList.remove('vista-oculta');
    vistaDestino.classList.add('vista-activa');
};


window.volverLista = function(idCategoria) {
    const listaDestino = document.getElementById('vista-lista-' + idCategoria);
    if (!listaDestino) return;

    const panelPadre = listaDestino.closest('.submenu-panel');

    panelPadre.querySelectorAll('.vista-activa').forEach(vista => {
        vista.classList.remove('vista-activa');
        vista.classList.add('vista-oculta');
    });

    listaDestino.classList.remove('vista-oculta');
    listaDestino.classList.add('vista-activa');
};

//vALIDACIÓN 

function abrirModalCatalogo() {
    document.getElementById('modal-catalogo-secreto').classList.add('mostrar');
    document.getElementById('input-codigo-cliente').value = '';
    document.getElementById('mensaje-error-codigo').style.display = 'none';
}

function cerrarModalCatalogo() {
    document.getElementById('modal-catalogo-secreto').classList.remove('mostrar');
}

function validarCodigoCatalogo() {
    const input = document.getElementById('input-codigo-cliente');
    const mensajeError = document.getElementById('mensaje-error-codigo');
    const codigoIngresado = input.value.trim().toUpperCase();

    
    const codigosValidos = ["VIP-2026", "TCA-GERENTE"];

    if (codigosValidos.includes(codigoIngresado)) {
        
        mensajeError.style.display = 'none';
        alert("¡Código validado! Iniciando descarga del catálogo...");
        cerrarModalCatalogo();
        
        //NO OLVIDARR aca luega va eL: window.open('ruta/al/catalogo.pdf', '_blank');
    } else {
        // código incorrecto
        mensajeError.style.display = 'block';
        input.style.borderColor = 'red';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const subcat = params.get('subcat'); 

    if (subcat) {
        fetch('js/productos.json')
            .then(response => response.json())
            .then(data => {
                // Ahora capturamos todo el bloque de la subcategoría
                const categoriaData = data[subcat]; 
                
                const contenedorMarcas = document.getElementById('contenedor-marcas');
                const contenedorProductos = document.getElementById('lista-productos');
                const tituloPagina = document.getElementById('titulo-pagina');
                const nombreMigas = document.getElementById('nombre-subcat-migas');
                const contenedorGris = document.getElementById('contenedor-gris');

                if (categoriaData) {
                   // 1. Ponemos el título en la página y en las migas de pan
                    const nombreLimpio = subcat.replace(/-/g, ' ').toUpperCase();
                    tituloPagina.innerText = nombreLimpio;
                    
                    const breadcrumb = document.querySelector('.breadcrumb');
                    const rutaDinamica = categoriaData.ruta ? categoriaData.ruta : 'Productos';
                    breadcrumb.innerHTML = `<a href="index.html">Inicio</a> > <span>${rutaDinamica}</span> > <strong id="nombre-subcat-migas">${nombreLimpio}</strong>`;
                    // 2. Dibujamos los LOGOS de las marcas
                    contenedorMarcas.innerHTML = ''; 
                    categoriaData.marcas.forEach(marca => {
                        contenedorMarcas.innerHTML += `
                            <div class="espacio-logo">
                                <img src="${marca.logo}" alt="Marca ${marca.nombre}">
                            </div>
                        `;
                    });

                    // 3. Dibujamos las TARJETAS de los productos
                    contenedorProductos.innerHTML = '';
                    const productos = categoriaData.productos;
                    
                    productos.forEach(p => {
                        contenedorProductos.innerHTML += `
                            <div class="item-producto-simple" onclick="abrirModalProducto('${p.imagen}', '${p.nombre}', 'Descubre todas nuestras presentaciones')">
                                <img src="${p.imagen}" alt="${p.nombre}">
                                <span>${p.nombre}<P>${p.marca}</P></span>
                            </div>
                        `;
                    });

// 4. Centramos los productos
 contenedorGris.className = 'caja-carrusel-gris'; // Limpiamos clases previas
                    if (productos.length === 1) contenedorGris.classList.add('centrar-un-item');
                    else if (productos.length === 2) contenedorGris.classList.add('centrar-dos-items');
                    else if (productos.length === 3) contenedorGris.classList.add('centrar-tres-items'); 
                    else if (productos.length === 4) contenedorGris.classList.add('centrar-cuatro-items');

                    // --- LÓGICA PARA OCULTAR O MOSTRAR FLECHAS ---
                    const flechas = document.querySelectorAll('.flecha-carrusel');
                    if (productos.length <= 4) {
                        // Si son 4 o menos, las desaparecemos
                        flechas.forEach(flecha => flecha.style.display = 'none');
                    } else {
                        // Si son 5 o más, nos aseguramos de que se vean
                        flechas.forEach(flecha => flecha.style.display = 'block');
                    }
                    // ---------------------------------------------
                }
            })
            .catch(error => console.error("Error al cargar el JSON:", error));
    }
});