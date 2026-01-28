import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.log("get-destinations function started");

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://vzwecagxbfukfrbnkuzw.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseKey) {
      return new Response(
        JSON.stringify({ error: "Missing SUPABASE_SERVICE_ROLE_KEY" }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Create a client with the service role key
    const client = await import("https://esm.sh/@supabase/supabase-js@2").then((supabase) =>
      supabase.createClient(supabaseUrl, supabaseKey, {
        auth: { autoRefreshToken: false },
        global: { headers: { apikey: supabaseKey } },
      })
    );

    // Query the database
    const { data, error } = await client
      .from("qt_destinations")
      .select("*")
      .order("quietScore", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }

    return new Response(
      JSON.stringify(data || []),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Error:", e);
    return new Response(
      JSON.stringify({ error: String(e) }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
