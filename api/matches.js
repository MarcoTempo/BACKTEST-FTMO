export default async function handler(req, res) {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) {
    res.status(500).json({ error: "Falta configurar FOOTBALL_DATA_TOKEN en Vercel." });
    return;
  }
  try {
    const r = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches?status=SCHEDULED",
      { headers: { "X-Auth-Token": token } }
    );
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(r.status).json(data);
  } catch (err) {
    res.status(502).json({ error: "No se pudo conectar con football-data.org: " + err.message });
  }
}
