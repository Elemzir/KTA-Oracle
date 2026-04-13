# KTA Oracle

**Open Source · Decentralized Oracle · 100% native Keeta Network SDK.** Real-time KTA price intelligence engine built on Cloudflare.

Every operation that touches on-chain data uses `@keetanetwork/keetanet-client` and `@keetanetwork/anchor` directly — no third-party price feeds, no external indexers, no bridging. Whale detection reads Keeta chain history natively. Tier activation scans on-chain payment history natively. FX quotes come from Keeta's own Anchor FX engine.

Runs a cron every 5 minutes — fetches live KTA/USD price, detects whale movements, and broadcasts events to KTA Social. Exposes REST endpoints for price data, FX rates, whale alerts, on-chain subscription verification, and internal payment operations.

The oracle worker has no public `workers.dev` URL. All public access is via the KTA Social proxy at `https://kta-oracle.top`. Direct integration with KTA Social is done through a Cloudflare service binding.

Source: [github.com/Elemzir/KTA-Oracle](https://github.com/Elemzir/KTA-Oracle) · Companion: [github.com/Elemzir/KTA-Social](https://github.com/Elemzir/KTA-Social)

---

## Endpoints

### Public

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Oracle landing page |
| `GET` | `/health` | Service health check |
| `GET` | `/price` | Live KTA/USD price with 1h / 24h / 7d change |
| `GET` | `/rate?currency=` | KTA rate in any of 160+ fiat currencies with real-time FX conversion |
| `GET` | `/whale/alerts` | Recent large on-chain KTA movements |
| `POST` | `/activate` | Scan on-chain history, assign tier, store in KV |
| `GET` | `/subscription?wallet=` | Tier, expiry, social lifetime status |

### Internal (`X-Internal-Secret` required)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/fx/quote` | FX quote between two Keeta tokens |
| `POST` | `/payment/send` | Initiate KTA payment from oracle wallet |
| `POST` | `/verify-payment` | Verify on-chain payment for a subscriber |

---

## Subscription Tiers

Payments accumulate on-chain — multiple sends from the same wallet stack toward the highest tier.

| KTA sent | Tier | Oracle calls | Social alerts | Whale alerts | Duration |
|----------|------|--------------|---------------|--------------|----------|
| 0.1 | Free | 20 / day | 100 trial | 1 ever | 5 days |
| 10 | Starter | 60 total | Trial only | 3 / month | 30 days |
| 50 | Social | 150 / month | **Lifetime** | Unlimited | 30 days |
| 300 | Pro | 300 / month | **Lifetime** | Unlimited | 30 days |
| 600 | Business | Unlimited | **Lifetime** | Unlimited | 30 days |

Send KTA to the oracle wallet address (set in `wrangler.toml` as `ORACLE_WALLET` in KTA Social). Then call `POST /activate` with the sender wallet address. The oracle reads full on-chain history and assigns the correct tier immediately.

### Tier Progression

Each tier has a natural ceiling. Users typically upgrade when they hit one of these:

- **Free → Starter**: Free tier lasts 5 days. Whale feed is locked and only 1 whale alert ever fires. Sending 10 KTA total extends access to 30 days, unlocks the live whale feed on `/onboard`, adds 3 whale alerts/month, and triples the API quota. Already sent 0.1? Only 9.9 more needed — sends accumulate.
- **Starter → Social**: Starter alerts expire after 30 days and still count against the 100-alert trial cap. Social (50 KTA total) is where alerts become permanent — social platform alerts never expire even if Oracle access lapses. One on-chain send, lifetime delivery.
- **Social → Pro**: Users who need compliance tools, wallet scoring, transaction history, or on-chain analytics outgrow Social. Pro (300 KTA total) adds the full analytics suite — built for operators, teams, and builders.
- **Pro → Business**: Business (600 KTA total) removes all limits — all 19 SDK tools, unlimited API calls, priority processing. Designed for institutions and teams running automated KTA workflows.

**Accumulation is the key mechanic**: all sends from the same wallet stack toward the highest tier. A user who sent 0.1 KTA is already on the ladder — every subsequent send moves them up without starting over.

---

## Deploy

```bash
npm install
npx wrangler deploy
```

**Required secrets** — set before deploying:

```bash
npx wrangler secret put KEETA_SEED
npx wrangler secret put INTERNAL_SECRET
npx wrangler secret put KTA_SOCIAL_URL
```

`KEETA_SEED` is the BIP39 passphrase for the oracle wallet. `INTERNAL_SECRET` must match the value set in KTA Social. `KTA_SOCIAL_URL` is only required if not using the Cloudflare service binding (fallback HTTP).

`KEETA_ACCOUNT_INDEX` is set in `wrangler.toml` (non-secret, defaults to `0`).

---

## Performance

| Operation | Latency | Notes |
|-----------|---------|-------|
| API read (`/price`, `/rate`, `/whale/alerts`) | <5ms | Served from Cloudflare edge KV — no origin round-trip |
| Price freshness | 5 min max | Cron fires every 5 minutes, writes to KV |
| FX rate conversion | <1ms after first fetch | Rates cached in KV for 1 hour |
| KTA settlement | **0.4s** | Keeta Network native finality — faster than Solana (~400ms avg), Ethereum (~12s), Bitcoin (~10min) |
| Tier activation | ~1–2s total | 0.4s on-chain settlement + chain scan + KV write |
| Whale detection | every hour | Gated to hourly — avoids CPU overrun on the cron |

The cron runs all independent operations in parallel: price fetch, history read, and whale detection run concurrently, keeping each 5-minute cycle well within Cloudflare's 30-second CPU limit.

For a REST/JSON price oracle, sub-5ms edge reads from a globally distributed network is at the ceiling of what HTTP can deliver. There is no faster retrieval path short of embedding the data in a CDN response.

---

## Mobile

The Oracle landing page (`/`) is fully mobile-responsive — hamburger navigation, fluid layouts, and touch-optimised controls. Tested across viewport widths from 320px.

---

## Native SDK

All on-chain operations are performed natively through the Keeta Network SDK — no third-party APIs:

| Operation | Native method |
|-----------|---------------|
| Whale detection | `client.history()` + `client.filterStapleOperations()` — reads chain directly |
| Tier activation | `scanChainTotal()` — sums KTA sent from subscriber wallet on-chain |
| FX quotes | `FX.Client.getEstimates()` — Keeta Anchor FX engine |
| Payment send | `UserClient` native transfer — 0.4s Keeta finality |
| Price (fallback) | `FX.Client.getEstimates()` KTA→USDC — Keeta liquidity pools |

The cron fetches live KTA price with a time-boxed 8s timeout and falls back to the last known price from KV — ensuring the cron never hangs regardless of network conditions. The Keeta Anchor SDK is used for on-demand price in HTTP endpoints where cold starts are acceptable.

---

## Stack

- Cloudflare Workers — TypeScript, cron trigger (`*/5 * * * *`)
- **Keeta Network SDK** — `@keetanetwork/keetanet-client`, `@keetanetwork/anchor` (100% native)
- Cloudflare KV — subscription state and price history ring buffer

---

## Why KTA-Oracle?

| Feature | Most MCP servers | KTA-Oracle |
|---------|-----------------|------------|
| Tools available | 1–5 | **19** |
| AI-powered reasoning on every response | ✗ | ✓ |
| Tiered subscriptions + on-chain payments | ✗ | ✓ |
| Agent-specific onboarding (autonomous) | ✗ | ✓ |
| AML + compliance tools | ✗ | ✓ |
| Production SDK code snippets | ✗ | ✓ |
| Rate limiting + abuse protection | ✗ | ✓ |
| Listed on 5+ marketplaces | ✗ | ✓ |

## Payment cost comparison

| | SWIFT wire — $50,000 | Keeta Network — $50,000 |
|-|----------------------|------------------------|
| Fee | ~$1,050 | **$75** |
| Speed | 3–5 business days | **0.4 seconds** |

14× cheaper · 1,080,000× faster · same global finality

---

## AI Integration

KTA Oracle exposes 19 SDK tools accessible through KTA Social at `/tools`. AI agents can connect via the REST endpoints or the SSE stream at `/stream?wallet=`. See the full integration guide at `/guide` on the KTA Social deployment.

---

## Alert detection tiers

The Oracle classifies every price move and emits a `changeLevel` to Social. Social uses this to bypass subscriber frequency timers on large moves.

| Price move | Level | Social cooldown override |
|---|---|---|
| < 5% | — | No alert emitted |
| 5–9% | `minor` | Respects subscriber frequency |
| 10–14% | `normal` | 4-hour max cooldown |
| 15–19% | `notable` | 1-hour max cooldown |
| 20–24% | `major` | 30-minute max cooldown |
| 25%+ | `extreme` | 5-minute max cooldown |

---

## Troubleshoot

**Every feature requires a minimum 0.1 KTA activated wallet.** Registration alone does not start alerts or unlock API access — you must send KTA and trigger activation.

| Symptom | Cause | Fix |
|---------|-------|-----|
| Wallet shows `unregistered` after sending KTA | Activation not triggered | Call `POST /activate` (via Social's `/activate-oracle`) after sending KTA |
| No alerts despite being registered | Trial exhausted or wallet not activated | Check `GET /subscription?wallet=` — if `tier: unregistered`, activate first |
| Alerts stopped after some time | Oracle 30-day window expired | Social alerts survive if `socialLifetime: true` (50+ KTA sent). Renew Oracle by sending more KTA |
| Wrong currency in alerts | FX rate missed a cycle | Re-register with the correct currency. Rates update every cron cycle |
| `GET /rate` returns stale data | KV cache miss on cold start | The cron writes FX data every 5 minutes. Wait one cron cycle and retry |
| `KV put() limit exceeded` | Free plan KV write quota hit | Upgrade to Cloudflare Workers Paid ($5/mo) for 1M writes/month |
| Activation returns 0 KTA | Oracle wallet has no KTA balance | Oracle wallet needs KTA to call `getEstimates()` from Anchor FX |

**Check subscription status:**
```
GET /subscription?wallet=keeta_your_wallet
```
Returns `tier`, `amount`, `socialLifetime`, `expiresAt`, and `activatedAt`.

---

## License

[MIT](./LICENSE) — the code is open source. Service access requires a KTA subscription.

## Security

See [SECURITY.md](./SECURITY.md).

## Contact

[@elemzir](https://x.com/elemzir)
