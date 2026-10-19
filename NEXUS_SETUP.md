# NEXUS Intelligence

NEXUS lives inside the existing EdgeWForce web app and shares its authentication and company permissions. HR, CEO, CTO, admin, superadmin and IT accounts can open the Intelligence Centre. Staff accounts cannot access company intelligence.

The data engine uses fixed, company-scoped database queries. It never runs model-generated SQL. Migration 014 adds daily snapshots, protected investigation history and an atomic generation limit. Apply it after 013 and set `NEXUS_ENABLED=true` in Vercel. Use `supabase/upgrade_existing_database.sql` for an older installation: it preserves staff, accounts, auth identities, inventory and history while converting numeric IDs to INTEGER. Do not run historical cleanup migration 008 on a populated project.

Analytics work without any model. They include 7/30-day comparisons, daily trends, attendance and late-arrival rates, scheduled-visit cohorts, order values, shared-task completions, departures, connectivity gaps and review signals. Every metric exposes its source, date range and calculation. Empty denominators display no rate. No demonstration figures or unconfigured targets are inserted.

The private reasoning layer supports Ollama and vLLM. No OpenAI account or OpenAI key is required. Model weights and the host have their own resource and licence requirements; open weights do not provide free hosted compute. A model has not been deployed merely because its adapter is present.

## Private model host

Use an existing Linux server with Docker, adequate RAM and disk space, and a domain pointing to it. GPU acceleration and a suitable model depend on your hardware; measure latency and response quality before production use. Vercel hosts the web/API app; the model runs on this separate server.

1. Copy `deploy/nexus` to the model server. Create a private `.env` there containing `OLLAMA_IMAGE` (an operator-tested version or digest), `NEXUS_MODEL` (your chosen model identifier), `NEXUS_MODEL_API_KEY` (a random secret of at least 32 characters), and `NEXUS_DOMAIN` (the model server's domain). Keep this file out of Git.
2. Run `docker compose up -d ollama`, then `docker compose exec ollama ollama pull YOUR_CHOSEN_MODEL`. Check the model's licence and hardware requirements.
3. Run `docker compose up -d --build`. Caddy terminates HTTPS. Ollama has no host port; the gateway only accepts the configured bearer key and model, caps request sizes and timeouts, and does not log prompts or evidence.
4. Set `NEXUS_MODEL_PROVIDER=ollama`, `NEXUS_MODEL_URL=https://YOUR_MODEL_DOMAIN`, `NEXUS_MODEL`, and `NEXUS_MODEL_API_KEY` in the Vercel server environment. Redeploy.
5. Verify the protected `/health` gateway endpoint, then run an investigation using synthetic data before using real reports. A configured endpoint is not a model health certification. Monitor host memory, latency and error rates; add infrastructure request limits appropriate to your load.

For an existing secured vLLM server, set `NEXUS_MODEL_PROVIDER=vllm` and use its root HTTPS URL. The server must support `/v1/chat/completions` and structured JSON-schema responses. Supply the host's bearer key. NEXUS does not connect to api.openai.com.

Official references: [Ollama structured outputs](https://docs.ollama.com/capabilities/structured-outputs), [vLLM structured outputs](https://docs.vllm.ai/en/stable/features/structured_outputs/).

## Evidence and uncertainty

Only the user's question and aggregate operational metrics are sent to the configured private model. Staff names, raw GPS, passwords and free-text HR explanations are not included in the evidence payload. Questions may contain information the user types, so users should avoid private details they do not want sent to their model server.

Structured output must cite known evidence IDs. Unsupported references, incomplete responses, numerical assertions in prose, oversized output and selected unsafe content fail the gate; verified analytics remain available. Numbers are shown from server calculations, separately from model prose. This gate validates references and formatting; it does not prove a narrative or cause is correct. Hypotheses remain explicitly unverified and include suggested checks. NEXUS does not make employment decisions or execute actions.

Only a hash of the question is retained in the investigation record. The verified evidence snapshot, report, model identifier, company, initiating user and timestamp are retained for audit. Cached narratives are shown only while their evidence hash matches the current calculations. Generation is limited to one attempt per company per minute, including across serverless instances. The provider call has a 20-second timeout; a larger local model may require faster hardware to meet it.

## Deployment status

The application source, migration checks, provider-adapter tests and UI build can be validated without a model host. End-to-end model quality and availability require a reachable configured host and representative evaluation. Do not label mocked adapter tests as a live AI deployment.
