
module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "The AI service is not configured yet." });
  const image = req.body && req.body.image;
  if (!image || !/^data:image\/(jpeg|png|webp);base64,/.test(image)) return res.status(400).json({ error: "Please upload a JPG, PNG, or WebP image." });
  if (image.length > 5_500_000) return res.status(413).json({ error: "That image is too large. Try a smaller photo." });
  const prompt = `Analyze the single main object in this image for a waste-reduction assistant understandable by a 10-year-old. Be practical, specific, and detailed. Never invent hidden damage, exact composition, recycling availability, or local facilities. If uncertain, say so. Return ONLY valid JSON with these keys: item (specific name), material, condition, confidence (High/Medium/Low), summary (2-3 sentences describing visible details), best_action (short), why (3-5 helpful sentences), impact (careful qualitative statement without fabricated numbers), safety (specific warnings and what local rules to check), options (exactly 3 objects, each with title, description of 3-5 sentences, and steps array of 4-6 short actionable steps). Prefer repair or reuse, then donation, then responsible recycling. If the image is unclear or not an object, explain that in the JSON and ask for a clearer image.`;
  try {
    const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-5.6-luna", input: [{ role: "user", content: [{ type: "input_text", text: prompt }, { type: "input_image", image_url: image }] }], max_output_tokens: 2200 }) });
    const body = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: body.error?.message || "OpenAI request failed." });
    const text = body.output_text || body.output?.flatMap(x => x.content || []).find(x => x.type === "output_text")?.text;
    if (!text) throw new Error("The model returned no analysis.");
    const clean = text.replace(/^\s*```(?:json)?/i, "").replace(/```\s*$/, "").trim();
    return res.status(200).json(JSON.parse(clean));
  } catch (error) { return res.status(500).json({ error: "The analysis could not be completed. Please try again." }); }
};
