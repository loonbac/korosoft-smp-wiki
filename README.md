# wikipage
Wiki-Para_Server

## Recursos Importantes
- **Configuración de Modelos (Espadas/Hachas) (Nexo)**: `c:\Users\Insent\Desktop\DRAKONIA-SFTP\plugins\Nexo\pack\assets\minecraft\items`
- **Configuración de Mobs (MythicMobs)**: `c:\Users\Insent\Desktop\DRAKONIA-SFTP\plugins\MythicMobs\mobs`
  - `CustomMobs.yml`: Mobs generales customizados (ej. Arañas, Abejas, etc.)
  - `Vampiros.yml`: Mobs de la facción de vampiros (Sangre, Murciélagos, etc.)
  - `bosses.yml`: Configuración de Jefes (Bosses principales)
  - `ECEliteMounts/`: Configuraciones de monturas
  - `VanillaMobs.yml`: Modificaciones a mobs vanilla
- **Configuración de Spawns (RandomSpawns)**: `c:\Users\Insent\Desktop\DRAKONIA-SFTP\plugins\MythicMobs\randomspawns`
- **Configuración de Accesorios (MMOItems)**: `c:\Users\Insent\Desktop\DRAKONIA-SFTP\plugins\MMOItems\item`
- **Configuración de Stats de Jugadores (MMOCore)**: 
  - `c:\Users\Insent\Desktop\DRAKONIA-SFTP\plugins\MMOCore\config.yml` → Valores iniciales  
  - `c:\Users\Insent\Desktop\DRAKONIA-SFTP\plugins\MMOCore\stats.yml` → Stats base y regeneración

## Guía de Extracción de Texturas
Para encontrar la textura correcta de un accesorio y su nombre en el juego:

1. **MMOItems**: Ir a `plugins/MMOItems/item/` y abrir el archivo del accesorio (ej. `ring.yml`).
2. Buscar el item (ej. `DADO_MALDITO`) y anotar:
    - `material` (ej. `BLACK_DYE` o `TINTE_NEGRO`)
    - `custom-model-data` (ej. `20041`)
    - `name` (Nombre a mostrar en la Wiki, ej. `Dado Maldito`)
3. **Nexo**: Ir a `plugins/Nexo/items/` y abrir el archivo correspondiente al material (ej. `tinte_negro.yml`).
4. Buscar el `custom_model_data` (ej. `20041`).
5. Encontrar la ruta del modelo en `Pack -> model` (ej. `tinte_negro:item/lesser_melee_crit_chance`).
6. El nombre de la imagen PNG es el último nombre de la ruta (ej. `lesser_melee_crit_chance.png`).
7. Buscar esta imagen en `plugins/Nexo/pack/assets/[namespace]/textures/item/` y copiarla a la wiki.

## Referencia de Stats de Jugadores (MMOCore)

### Ubicación de Datos
Para actualizar la "Guía de Inicio", consultar:
- **Valores iniciales**: `MMOCore/config.yml` (líneas 33-43) - Nota: valores están en 1000 y se ajustan automáticamente al máximo
- **Stats base y regeneración**: `MMOCore/stats.yml` (sección `default:`)

### Stats Actuales (Referencia)
- **MAX_HEALTH**: 20 HP (base: 20, per-level: 0)
- **MAX_MANA**: 50 puntos (base: 50, per-level: 0)
- **MAX_STAMINA**: 50 puntos (base: 50, per-level: 0)
- **MAX_STELLIUM**: 20 puntos (base: 20, per-level: 0)
- **HEALTH_REGENERATION**: 0.15/seg (base: 0.15, per-level: 0)
- **MANA_REGENERATION**: 0.15/seg base + 0.03/nivel (base: 0.15, per-level: 0.03)
- **STAMINA_REGENERATION**: 0.15/seg base + 0.03/nivel (base: 0.15, per-level: 0.03)
- **STELLIUM_REGENERATION**: 0.01/seg (base: 0.01, per-level: 0)

## Tiers de Rareza (MMOItems)
Cuando veas estos valores en el campo `tier:` de MMOItems:
- `COMUN` → ⭐ (1 estrella)
- `NOCOMUN` → ⭐⭐ (2 estrellas)  
- `RARE` → ⭐⭐⭐ (3 estrellas)

## Guía de Actualización de Mobs (Wiki)
El archivo `mobs.html` ahora usa un sistema optimizado con Javascript. Para agregar u editar mobs, no toques el HTML principal. Ve al final del documento, dentro de la etiqueta `<script>`.

### Cómo agregar un nuevo Mob
Busca la lista `const mobs = [ ... ]` y agrega un nuevo bloque de datos siguiendo este formato:

```javascript
{
    name: "Nombre del Mob",
    danger: 3,                 // Nivel de peligro (1-10)
    hp: 40,                    // Vida
    dmg: 5,                    // Daño
    armor: 2,                  // Armadura
    speed: 0.30,               // Velocidad
    desc: "Descripción breve.",
    spawn: "Ubicación",
    // Icono SVG (copiar el 'path d="..."' de un SVG de Material Design o similar)
    icon: "M12,2A...", 
    // Si quieres que tenga calaveras extra en el icono (como jefes)
    // skull: true,
    
    // Lista de Drops
    drops: [
        { item: "Nombre Item", qty: "1-2", prob: "100%" },
        // Si el item tiene enlace a accesorios:
        { item: "Item Raro", url: "accessories.html", qty: "1", prob: "5%" }
    ]
},
```

### Notas Importantes
- **Iconos**: El sistema usa "SVG Paths". Puedes buscar iconos en sitios como [Pictogrammers](https://pictogrammers.com/library/mdi/) y copiar solo lo que está dentro de `d="..."`.
- **Orden**: Los mobs se muestran en el orden en que aparecen en la lista.
- **Filtros**: El sistema de filtros por nivel de peligro (Bajo/Medio/Alto) es automático basado en el valor `danger`.
