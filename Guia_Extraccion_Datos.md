# Guía Técnica de Extracción de Datos para la Wiki de Korosoft-SMP

Este documento detalla el procedimiento estándar e insustituible para auditar la carpeta `Korosoft-SMP/plugins/` e incorporar información 100% verídica a la Wiki Oficial.

---

## 1. Fuentes Oficiales de Datos (Plugins de Korosoft-SMP)

Cualquier dato publicado en la wiki debe provenir estrictamente de la inspección directa de los siguientes archivos de configuración del servidor `Korosoft-SMP`:

### A. MythicMobs (Estadísticas, Mecánicas y Escalado por Nivel)
La totalidad de las criaturas del reino se encuentran definidas en el directorio `plugins/MythicMobs/mobs/Mobs_Overworld/`:
- **`plugins/MythicMobs/mobs/Mobs_Overworld/Mobs_Superficie.yml`**: Mobs de superficie del Overworld.
- **`plugins/MythicMobs/mobs/Mobs_Overworld/Mobs_Cuevas.yml`**: Mobs subterráneos y cavernas.
- **`plugins/MythicMobs/mobs/Mobs_Overworld/Pillager_overworld.yml`**: Mobs de asaltos y patrullas de saqueadores.
- **`plugins/MythicMobs/mobs/Jefes_Overworld/`**: Jefes supremos del Overworld (`Harvester.yml`, `Bear_Spirit.yml`, `Flor_Mutante.yml`, etc.).

### B. Regla Estricta de Auditoría de Drops y Botín (MythicMobs Drops Block)
Queda **ESTRICTAMENTE PROHIBIDO** inventar o asumir porcentajes o items de botín sin leer directamente la sección `Drops:` de cada mob y su respectivo archivo de DropTables (`plugins/MythicMobs/droptables/Monedas.yml`).

- **Regla de Monedas por Nivel de Peligro (`Monedas.yml`)**:
  - `Monedas_Peligro_0`: 2-10 Monedas Cobre (100%) | Exp: 5 XP.
  - `Monedas_Peligro_1`: 4-18 Monedas Cobre (100%) | Exp: 5-8 XP.
  - `Monedas_Peligro_2`: 8-28 Monedas Cobre (100%) + (Hasta 25% Plata a Lv.15) | Exp: 10-15 XP.
  - `Monedas_Peligro_3`: 15-48 Monedas Cobre (100%) + (20%-60% Plata a Lv.5+) | Exp: 10-15 XP.
  - `Monedas_Peligro_4`: 25-75 Monedas Cobre (100%) + (1-2 Plata: 35%-100%) | Exp: 24-30 XP.
  - `Monedas_Peligro_5`: 40-120 Monedas Cobre (100%) + (1-3 Plata: 60%-100%) | Exp: 30-50 XP.
  - `Monedas_Peligro_6`: 60-180 Monedas Cobre (100%) + (2-5 Plata: 100%) + (1 Oro: 35% a Lv.15) | Exp: 15-20 XP.
  - `Monedas_Peligro_7`: 100-300 Monedas Cobre (100%) + (3-12 Plata: 100%) + (1-3 Oro: 30%-100%) | Exp: 20-80 XP.

- **Regla de Drops de Items Custom (`mmoitems`)**:
  - `mmoitems{type=RING;id=AVENT_CANTIMPLORA}`: 15% (Mono).
  - `mmoitems{type=RING;id=AVENT_BRUJULA}`: 15% (Arquero Cueva).
  - `mmoitems{type=RING;id=CAZA_CARNE}`: 20% (Zombie Superficie / Zombie Cueva).
  - `mmoitems{type=RING;id=AVENT_ANILLO}`: 10% (Espadachín Cueva).
  - `mmoitems{type=RING;id=CAZA_OJO}` & `POCION;id=OJO_ARANA_1`: 15% (Arácnido Cueva).
  - `mmoitems{type=MATERIAL;id=ARC_ESSENCE}`: 8% (Slime Azul), 25% (Wimdz, Lamento Cueva), 50% (Ilusionista).
  - `mmoitems{type=RING;id=AVENT_MAPA}`: 8% (Verdugo Cueva).
  - `mmoitems{type=CONSUMABLE;id=MARBLED_MEAT}`: 75% (Hipopótamo).

### C. Nombres de Display Oficiales del Servidor (`Display:`)
Queda **ESTRICTAMENTE PROHIBIDO** añadir sufijos parentéticos descriptivos como `(Enderman Colinas)`, `(Enderman Badlands)`, `(Enderman Flor)` en el título de la tarjeta del bestiario:
- **Regla General**: El nombre exhibido en la Wiki debe ser **ÚNICAMENTE** el nombre oficial extraído de la propiedad `Display:` en el archivo `.yml` de MythicMobs.
- *Ejemplo*: `enderman_badlands` (`Display: '&fBadmads'`) $\rightarrow$ **Badmads** (No "Enderman de Badlands").
- *Ejemplo*: `enderman_windswept_hills` (`Display: '&fWimdz'`) $\rightarrow$ **Wimdz** (No "Wimdz (Enderman Colinas)").
- *Ejemplo*: `enderman_flower_fields` (`Display: '&fFlowey'`) $\rightarrow$ **Flowey** (No "Flowey (Enderman Flor)").
- *Ejemplo*: `enderman_mushroom` (`Display: '&fMushroo'`) $\rightarrow$ **Mushroo** (No "Mushroo (Enderman Hongo)").
- *Ejemplo*: `enderman_cave` (`Display: '&fRockve'`) $\rightarrow$ **Rockve** (No "Rockve (Enderman Cueva)").

### D. Estándar de Presentación de Sets de Accesorios
Para cada conjunto de artefactos y reliquias (`accesorios.html`):
1. **Resumen de Estimación Total Equipado (6/6 Piezas)**: Es **OBLIGATORIO** incluir una tarjeta superior con el cálculo estimado que suma las estadísticas individuales promedio de las 6 piezas base MÁS los bonos acumulados de los 3 escalones de set (2, 4 y 6 piezas).
2. **Acordeón Desplegable (`<details>`)**: El desglose técnico de cada escalón de set (2, 4 y 6 piezas) debe presentarse dentro de un acordeón desplegable opcional para evitar recargar visualmente la interfaz y permitir al jugador consultar los bonos según su preferencia.

---

## 2. Sistema de Niveles y Estadísticas (Niveles 1 al 15)

Todas las criaturas en Korosoft-SMP aparecen con un nivel aleatorio entre **Lv.1 y Lv.15**. Jamás se debe asumir una tasa fija de escalado; es **MANDATORIO** extraer los modificadores `LevelModifiers` específicos de cada `.yml`:

1. **Salud (`Health`)**:
   $$\text{HP}_{\text{Nivel } L} = \text{Health Base} + (L - 1) \times \text{LevelModifiers.Health}$$
2. **Daño (`Damage`)**:
   $$\text{Damage}_{\text{Nivel } L} = \text{Damage Base} + (L - 1) \times \text{LevelModifiers.Damage}$$
3. **Armadura (`Armor`)**:
   $$\text{Armadura}_{\text{Nivel } L} = \text{Armor Base} + (L - 1) \times \text{LevelModifiers.Armor}$$
4. **Dureza de Armadura (`ArmorToughness`)**:
   $$\text{Toughness}_{\text{Nivel } L} = \text{Toughness Base} + (L - 1) \times \text{LevelModifiers.ArmorToughness}$$

---

## 3. Ejemplo Auditado: `Chromotherium` (Peligro 7)

- **Archivo Origen**: `Mobs_Superficie.yml`
- **Health Base**: `600` | **LevelModifiers.Health**: `45` $\rightarrow$ **Lv.15:** $600 + 14 \times 45 = 1230\text{ HP}$
- **Damage Base**: `34` | **LevelModifiers.Damage**: `3.6` $\rightarrow$ **Lv.15:** $34 + 14 \times 3.6 = 84.4\text{ DMG}$
- **Armor Base**: `15` | **LevelModifiers.Armor**: `1.0` $\rightarrow$ **Lv.15:** $15 + 14 \times 1 = 29.0\text{ DEF}$
- **Toughness Base**: `10` | **LevelModifiers.ArmorToughness**: `0.7` $\rightarrow$ **Lv.15:** $10 + 14 \times 0.7 = 19.8\text{ Toughness}$
- **Drops Exactos Auditados**:
  - `Monedas_Peligro_7`: `100 a 300 Monedas Cobre`, `3 a 12 Plata`, `1 a 3 Oro` (100% prob)
  - `Experiencia`: `50 - 80 XP` (100% prob)

---

## 4. Estándares Visuales y Estilo (Prohibición de Emojis)

- **Cero Emojis Unicode**: En la Wiki de Korosoft-SMP **está prohibido usar emojis gráficos o unicode** (`❤️`, `⚔️`, `🛡️`, `📍`, `⚡`).
- **Uso de Vectores SVG**: Todos los indicadores visuales deben construirse con **iconos vectoriales SVG en línea** con viewBox estándar y colores acordes al tema medieval (dorado, verde esmeralda, rojo carmesí).

---

## 5. Metodología de Auditoría de Hábitat & Biomas F3 (`randomspawns/`)

Para determinar los lugares de spawn de cada criatura y renderizar correctamente el modal del botón **`📌 Hábitat`**, es **OBLIGATORIO Y ESTRICTO** consultar la carpeta `plugins/MythicMobs/randomspawns/` siguiendo una bifurcación lógica sin errores:

### A. Criaturas de Superficie (`Spawns_Superficie.yml`)
- Poseen la llave `Biomes:`.
- **Regla F3**: Se deben extraer e ingresar en `f3Biomes: [...]` traducidos a minúsculas con prefijo `minecraft:` para la pantalla de depuración **F3**.
- *Ejemplo (`Spawn_Jaguar`)*: `Biomes: sparse_jungle` $\rightarrow$ Modal F3: `minecraft:sparse_jungle` (Título: *Biomas F3 (Superficie)*).
- *Ejemplo (`Spawn_Pantera_Negra`)*: `Biomes: bamboo_jungle` $\rightarrow$ Modal F3: `minecraft:bamboo_jungle` (Título: *Biomas F3 (Superficie)*).
- *Ejemplo (`enderman_windswept_hills`)*: `Biomes: WINDSWEPT_HILLS,WINDSWEPT_GRAVELLY_HILLS,WINDSWEPT_FOREST` $\rightarrow$ Modal F3: `minecraft:windswept_hills`, `minecraft:windswept_gravelly_hills`, `minecraft:windswept_forest`.

### B. Criaturas Subterráneas / Cavernas (`Spawns_Cuevas.yml`)
- Mobs como el **Minero de Cueva**, **Slime Negro**, **Espadachín de Cueva**, **Armadura Viviente**, etc., **NO POSEEN LA LLAVE `Biomes:`** porque aparecen bajo tierra en cualquier bioma.
- **Regla Estricta para la Wiki**: **JAMÁS** omitir la condición de capa `heightbelow` cuando se encuentra definida en el `.yml`.
- **Formato Obligatorio**: Si el mob proviene de `Spawns_Cuevas.yml`, se debe desplegar el modal en modo **`Condiciones de Spawn (Caverna)`** registrando sus condiciones reales:
  - `outside false` $\rightarrow$ Ubicación: Subterráneo / Cavernas.
  - `heightbelow X` $\rightarrow$ Capa Y: Por debajo de capa X (ej. *Capa Y < 20* para Minero, *Capa Y < 0* para Slime Negro de `Spawns_Cuevas.yml:L174`).
  - `lightlevel 0-3` $\rightarrow$ Nivel de luz en penumbra.




---

## 6. Fórmulas de Mitigación y Calculadora (Vanilla + Toughness)

$$\text{Reducción} = \min\left(20, \max\left(\frac{\text{Armadura}}{5}, \text{Armadura} - \frac{4 \times \text{Daño Base}}{\text{Toughness} + 8}\right)\right)$$
$$\text{Daño Neto} = \text{Daño Base} \times \left(1 - \frac{\text{Reducción}}{25}\right)$$
$$\text{Hits} = \left\lceil \frac{\text{Vida Escala (Lv. 1 a 15)}}{\text{Daño Neto}} \right\rceil$$

