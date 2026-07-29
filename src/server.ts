import { join } from "path";
import mobsData from "./data/mobs.json";
import jefesData from "./data/jefes.json";
import armadurasData from "./data/armaduras.json";
import accesoriosData from "./data/accesorios.json";
import cocinaData from "./data/cocina.json";
import mineralesData from "./data/minerales.json";
import mesasData from "./data/mesas.json";
import comandosData from "./data/comandos.json";
import guiaData from "./data/guia.json";
import updatesData from "./data/updates.json";
import serverData from "./data/server.json";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const ROOT_DIR = join(import.meta.dir, "..");

console.log(`🏰 Iniciando Servidor Bun de Korosoft SMP Wiki en puerto ${PORT}...`);

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    const json = (data: any, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
      });

    // --- REST API ENDPOINTS ---
    if (path === "/api/mobs") {
      const q = url.searchParams.get("q")?.toLowerCase();
      const danger = url.searchParams.get("danger");

      let result = mobsData;
      if (danger) {
        if (danger === "p0") result = result.filter((m) => m.danger === 0);
        else if (danger === "p1") result = result.filter((m) => m.danger === 1);
        else if (danger === "p2") result = result.filter((m) => m.danger === 2);
        else if (danger === "p3") result = result.filter((m) => m.danger === 3);
        else if (danger === "p45") result = result.filter((m) => m.danger >= 4);
      }
      if (q) {
        result = result.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.desc.toLowerCase().includes(q) ||
            m.spawn.toLowerCase().includes(q) ||
            m.mechanic.toLowerCase().includes(q) ||
            (m.f3Biomes && m.f3Biomes.some((b) => b.toLowerCase().includes(q)))
        );
      }
      return json(result);
    }

    if (path.startsWith("/api/mobs/")) {
      const id = path.replace("/api/mobs/", "");
      const mob = mobsData.find((m) => m.id === id);
      return mob ? json(mob) : json({ error: "Mob no encontrado" }, 404);
    }

    if (path === "/api/jefes") return json(jefesData);
    if (path === "/api/armaduras") return json(armadurasData);
    if (path === "/api/accesorios") return json(accesoriosData);
    if (path === "/api/cocina") return json(cocinaData);
    if (path === "/api/minerales") return json(mineralesData);
    if (path === "/api/mesas") return json(mesasData);
    if (path === "/api/comandos") return json(comandosData);
    if (path === "/api/guia") return json(guiaData);
    if (path === "/api/updates") return json(updatesData);
    if (path === "/api/status") return json({ ...serverData, timestamp: new Date().toISOString() });

    // API Búsqueda Global
    if (path === "/api/search") {
      const q = url.searchParams.get("q")?.toLowerCase() || "";
      if (!q || q.length < 2) return json({ results: [] });

      const results: any[] = [];
      mobsData.forEach((m) => {
        if (m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q) || m.spawn.toLowerCase().includes(q)) {
          results.push({ type: "Mob Bestiario", title: m.name, subtitle: `Peligro ${m.danger} | ${m.spawn}`, url: `/paginas/mobs.html` });
        }
      });
      jefesData.forEach((j) => {
        if (j.name.toLowerCase().includes(q) || j.desc.toLowerCase().includes(q)) {
          results.push({ type: "Jefe Overworld", title: j.name, subtitle: j.title, url: `/paginas/jefes.html` });
        }
      });
      comandosData.forEach((cat) => {
        cat.commands.forEach((c) => {
          if (c.command.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)) {
            results.push({ type: "Comando", title: c.command, subtitle: c.desc, url: `/paginas/comandos.html` });
          }
        });
      });
      return json({ query: q, results });
    }

    // API Calculadora de Daño
    if (path === "/api/calc/damage" && req.method === "POST") {
      try {
        const body = await req.json();
        const baseDmg = parseFloat(body.baseDmg) || 0;
        const attackType = body.attackType || "normal";
        const mobIdx = parseInt(body.mobIndex);
        const mobLevel = parseInt(body.mobLevel) || 1;

        const targetMob = mobsData[mobIdx] || mobsData[0];
        const levelOffset = mobLevel - 1;
        const scaledHp = targetMob.hpMin + levelOffset * targetMob.hpMod;
        const scaledArmor = targetMob.armorMin + levelOffset * targetMob.armorMod;
        const scaledTough = targetMob.toughMin + levelOffset * targetMob.toughMod;

        let attackPower = baseDmg;
        if (attackType === "critical") attackPower *= 1.5;

        let realDmg = attackPower;
        if (attackType !== "magic" && (scaledArmor > 0 || scaledTough > 0)) {
          const reduction = Math.min(
            20,
            Math.max(scaledArmor / 5, scaledArmor - (4 * attackPower) / (scaledTough + 8))
          );
          realDmg = attackPower * (1 - reduction / 25);
        }

        const hitsNeeded = Math.ceil(scaledHp / Math.max(0.1, realDmg));

        return json({
          mob: targetMob.name,
          level: mobLevel,
          scaledHp: scaledHp.toFixed(1),
          scaledArmor: scaledArmor.toFixed(1),
          scaledTough: scaledTough.toFixed(1),
          attackPower: attackPower.toFixed(1),
          realDmg: realDmg.toFixed(1),
          hitsNeeded,
        });
      } catch (err) {
        return json({ error: "Datos inválidos" }, 400);
      }
    }

    // --- SERVIR ARCHIVOS ESTÁTICOS DE LA WIKI ORIGINAL ---
    let relativePath = path === "/" ? "/index.html" : path;
    const filePath = join(ROOT_DIR, relativePath);
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    return new Response("404 Página no encontrada", { status: 404 });
  },
});

console.log(`✅ Servidor Korosoft SMP Wiki ejecutándose en http://localhost:${PORT}`);
