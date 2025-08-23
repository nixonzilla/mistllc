// Utility function for D1 queries
async function queryDB(query, params = []) {
    const result = await DB.prepare(query).bind(...params).all();
    return result.results;
}
async function handleRequest(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    // GET /songs?search=&sort=
    if (request.method === "GET" && pathname === "/songs") {
        const search = url.searchParams.get("search") || "";
        const sort = url.searchParams.get("sort") || "created_at";
        const songs = await queryDB(`SELECT * FROM songs WHERE title LIKE ? OR artiste LIKE ? ORDER BY ${sort} DESC`, [`%${search}%`, `%${search}%`]);
        return new Response(JSON.stringify(songs), { headers: { "Content-Type": "application/json" } });
    }
    // POST /songs
    if (request.method === "POST" && pathname === "/songs") {
        const { title, artiste } = await request.json();
        if (!title || !artiste) {
            return new Response(JSON.stringify({ error: "title and artiste are required" }), { status: 400, headers: { "Content-Type": "application/json" } });
        }
        const result = await queryDB("INSERT INTO songs (title, artiste, created_at) VALUES (?, ?, datetime('now')) RETURNING *", [title, artiste]);
        return new Response(JSON.stringify(result[0]), { headers: { "Content-Type": "application/json" } });
    }
    // PUT /songs/:id
    if (request.method === "PUT" && pathname.startsWith("/songs/")) {
        const id = pathname.split("/")[2];
        const { title, artiste } = await request.json();
        await queryDB("UPDATE songs SET title = ?, artiste = ? WHERE id = ?", [title, artiste, id]);
        return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
    }
    // DELETE /songs/:id
    if (request.method === "DELETE" && pathname.startsWith("/songs/")) {
        const id = pathname.split("/")[2];
        await queryDB("DELETE FROM songs WHERE id = ?", [id]);
        return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
    }
    return new Response("Route not found", { status: 404 });
}
export default {
    fetch: handleRequest,
};
//# sourceMappingURL=index.js.map