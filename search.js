// Base de datos de búsqueda global
const SEARCH_DATA = [
  // General
  { title: "📖 Guía de Inicio", category: "General", path: "paginas/guia.html", keywords: "guia inicio tutorial empezar tutoriales" },
  { title: "💬 Comando /ah (Subastas)", category: "Comandos", path: "paginas/comandos.html", keywords: "ah subastas mercado economia comando comandos" },
  { title: "🎁 Códigos /canjear", category: "General", path: "paginas/canjear.html", keywords: "canjear codigos regalo recompensas promo promocional bienvenido2026 korosoft2026 miprimerkit miprimeraarma myfirstboss kit armas inicio" },
  { title: "💬 Comando /marry (Matrimonios)", category: "Comandos", path: "paginas/comandos.html", keywords: "marry matrimonio casarse casamiento comando comandos" },
  { title: "🔮 Novedades & Parches", category: "General", path: "paginas/novedades.html", keywords: "novedades actualizacion actualizaciones parches cambios noticias" },
  
  // Bestiario
  { title: "👾 Tucán", category: "Bestiario", path: "paginas/mobs.html", keywords: "tucan bird pajaro mobs tucán selva" },
  { title: "👾 Geeko", category: "Bestiario", path: "paginas/mobs.html", keywords: "geeko reptil lagarto mobs desierto" },
  { title: "👾 Arquero", category: "Bestiario", path: "paginas/mobs.html", keywords: "arquero skeleton esqueleto mobs cuevas" },
  { title: "👾 Flowey", category: "Bestiario", path: "paginas/mobs.html", keywords: "flowey flor planta mobs pradera" },
  { title: "☠️ Jack el Cosechador", category: "Jefes", path: "paginas/jefes.html", keywords: "jack cosechador calabaza boss jefe jefes halloween" },
  { title: "☠️ Oso Espíritu Ancestral", category: "Jefes", path: "paginas/jefes.html", keywords: "oso espiritu ancestral boss jefe jefes" },
  
  // Equipamiento
  { title: "🛡️ Armaduras Crafteables", category: "Equipamiento", path: "paginas/armaduras.html", keywords: "cuero basico malla bronce armadura armaduras sets" },
  { title: "💍 Set Caza Monstruos", category: "Equipamiento", path: "paginas/accesorios.html", keywords: "caza monstruos set accesorios anillo collar" },
  { title: "💍 Set de Aventura", category: "Equipamiento", path: "paginas/accesorios.html", keywords: "aventura set accesorios catalejo mapa" },
  
  // Recursos & Crafteos
  { title: "🍲 Guía de Cocina", category: "Recursos", path: "paginas/cocina.html", keywords: "cocina cocina comida recetas medallones grasa animal repollo bayas" },
  { title: "⛏️ Estaño", category: "Minerales", path: "paginas/minerales.html", keywords: "estano mineral bloque estaño mena" },
  { title: "⛏️ Plomo", category: "Minerales", path: "paginas/minerales.html", keywords: "plomo mineral bloque mena" },
  { title: "⛏️ Mithril", category: "Minerales", path: "paginas/minerales.html", keywords: "mithril mineral bloque mitril mena" },
  { title: "⚙️ Estación de Magia", category: "Mesas", path: "paginas/mesas.html", keywords: "estacion magia mesa runas esencias nexo" },
  { title: "⚙️ Estación de Encantamientos Avanzados", category: "Mesas", path: "paginas/mesas.html", keywords: "estacion encantamientos avanzada mesa libros" },
  { title: "🌾 Crianza de Animales", category: "Recursos", path: "paginas/crianza.html", keywords: "crianza animales mantenimiento reproduccion ganado oveja vaca cerdo" }
];

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  // Detectar directorio base para rutas relativas
  const isSubfolder = window.location.pathname.includes('/paginas/');
  const basePath = isSubfolder ? '../' : './';

  // Crear contenedor de resultados
  const searchWrapper = searchInput.parentElement;
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'search-results-dropdown';
  resultsContainer.style.cssText = `
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
    background: #1e1e1e;
    border: 1px solid #c9a054;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    max-height: 300px;
    overflow-y: auto;
    display: none;
    z-index: 1000;
  `;
  searchWrapper.appendChild(resultsContainer);

  // Escuchar entrada de texto
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
      resultsContainer.style.display = 'none';
      return;
    }

    const filtered = SEARCH_DATA.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) || 
      item.keywords.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 1rem; color: #888; font-size: 0.9rem; text-align: center;">
          🔍 No se encontraron resultados para "${searchInput.value}"
        </div>
      `;
    } else {
      resultsContainer.innerHTML = filtered.map(item => `
        <a href="${basePath}${item.path}" style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 1rem;
          color: #ccc;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 0.9rem;
          transition: background 0.2s;
        " onmouseover="this.style.background='rgba(201, 160, 84, 0.1)'; this.style.color='#c9a054';" 
           onmouseout="this.style.background='none'; this.style.color='#ccc';">
          <span>${item.title}</span>
          <span style="font-size: 0.75rem; background: rgba(255,255,255,0.05); color: #888; padding: 0.2rem 0.5rem; border-radius: 4px;">
            ${item.category}
          </span>
        </a>
      `).join('');
    }
    resultsContainer.style.display = 'block';
  });

  // Cerrar al hacer clic afuera
  document.addEventListener('click', (e) => {
    if (!searchWrapper.contains(e.target)) {
      resultsContainer.style.display = 'none';
    }
  });

  // Mostrar al enfocar si tiene texto
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      resultsContainer.style.display = 'block';
    }
  });
});

// Lógica universal de menú lateral replegable / desplegable (Índice de Wiki)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sidebar-category').forEach(category => {
    // Insertar flecha indicadora si no existe
    if (!category.querySelector('.toggle-icon')) {
      const icon = document.createElement('span');
      icon.className = 'toggle-icon';
      icon.innerHTML = '▼';
      category.appendChild(icon);
    }

    // Evento de clic para desplegar / replegar la categoría
    category.addEventListener('click', (e) => {
      e.stopPropagation();
      const section = category.closest('.sidebar-section') || category.parentElement;
      section.classList.toggle('collapsed');
    });
  });
});
