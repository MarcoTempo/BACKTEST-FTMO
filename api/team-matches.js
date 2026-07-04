export default async function handler(req, res) {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  const { teamId } = req.query;
  if (!token) {
    res.status(500).json({ error: "Falta configurar FOOTBALL_DATA_TOKEN en Vercel." });
    return;
  }
  if (!teamId) {
    res.status(400).json({ error: "Falta el parámetro teamId." });
    return;
  }
  try {
    const r = await fetch(
      `https://api.football-data.org/v4/teams/${teamId}/matches?status=FINISHED&limit=15`,
      { headers: { "X-Auth-Token": token } }
    );
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(r.status).json(data);
  } catch (err) {
    res.status(502).json({ error: "No se pudo conectar con football-data.org: " + err.message });
  }
}
