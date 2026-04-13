import { UserClient, lib as KeetaNetLib } from "@keetanetwork/keetanet-client";
import type { Env } from "./types.js";

export const TIER_REGISTRATION    = 0.1;
export const TIER_STARTER         = 10;
export const TIER_SOCIAL          = 50;
export const TIER_PRO             = 300;
export const TIER_BUSINESS        = 600;
export const TIER_FREE_VALIDITY_MS    = 5  * 24 * 60 * 60 * 1000;
export const TIER_STARTER_VALIDITY_MS = 30 * 24 * 60 * 60 * 1000;
export const TIER_VALIDITY_MS         = 30 * 24 * 60 * 60 * 1000;
export const FREE_CALLS_PER_DAY   = 20;
export const STARTER_CALLS_TOTAL  = 60;
export const PAID_CALLS_PER_MONTH = 150;
export const PRO_CALLS_PER_MONTH  = 300;

const KTA_NATIVE_DECIMALS = 1e18;

export type SubTier = "unregistered" | "free" | "starter" | "social" | "pro" | "business";

export interface SubRecord {
  tier:           SubTier;
  amount:         number;
  activatedAt:    number;
  expiresAt:      number;
  socialLifetime: boolean;
}

export interface ActivateResult {
  success:        boolean;
  tier:           SubTier;
  amount:         number;
  socialLifetime: boolean;
  expiresAt:      string | null;
  message:        string;
}

async function accountFromPhrase(phrase: string, index = 0) {
  const seed = await (KeetaNetLib.Account as any).seedFromPassphrase(phrase.trim());
  return KeetaNetLib.Account.fromSeed(seed, index);
}

async function scanChainTotal(env: Env, subscriberWallet: string): Promise<number> {
  const signer  = await accountFromPhrase(env.KEETA_SEED);
  const client  = (UserClient as any).fromNetwork("main", signer);
  const oracle  = await accountFromPhrase(env.KEETA_SEED);
  const history = await client.history(oracle);

  let total = 0;
  for (const staple of (history as unknown[])) {
    try {
      const ops = await client.filterStapleOperations(staple, oracle);
      for (const op of (Array.isArray(ops) ? ops : Object.values(ops as object).flat())) {
        const o = op as Record<string, unknown>;
        if (String(o?.from ?? "") === subscriberWallet)
          total += Number(o?.amount ?? 0) / KTA_NATIVE_DECIMALS;
      }
    } catch {}
  }
  return total;
}

function resolveFullTier(amount: number): SubTier {
  if (amount >= TIER_BUSINESS)     return "business";
  if (amount >= TIER_PRO)          return "pro";
  if (amount >= TIER_SOCIAL)       return "social";
  if (amount >= TIER_STARTER)      return "starter";
  if (amount >= TIER_REGISTRATION) return "free";
  return "unregistered";
}

export async function loadSubscription(env: Env, wallet: string): Promise<SubRecord | null> {
  try {
    const raw = await env.KV.get(`oracle:sub:${wallet}`, "json") as SubRecord | null;
    if (!raw) return null;
    if (raw.expiresAt < Date.now()) return null;
    return raw;
  } catch {
    return null;
  }
}

export async function activateWallet(env: Env, wallet: string): Promise<ActivateResult> {
  if (!wallet.startsWith("keeta_") || wallet.length < 20 || !/^keeta_[a-z0-9]+$/.test(wallet)) {
    return { success: false, tier: "unregistered", amount: 0, socialLifetime: false, expiresAt: null, message: "Invalid wallet address." };
  }

  let total: number;
  try {
    total = await scanChainTotal(env, wallet);
  } catch (e) {
    return { success: false, tier: "unregistered", amount: 0, socialLifetime: false, expiresAt: null, message: `Chain scan failed: ${e instanceof Error ? e.message : String(e)}` };
  }

  if (total < TIER_REGISTRATION) {
    return {
      success: false,
      tier: "unregistered",
      amount: total,
      socialLifetime: false,
      expiresAt: null,
      message: `No qualifying payment found (${total.toFixed(6)} KTA). Minimum: ${TIER_REGISTRATION} KTA for free tier (${FREE_CALLS_PER_DAY} calls/day). Send to the oracle wallet with your wallet address as memo, then call activate again.`,
    };
  }

  const tier           = resolveFullTier(total);
  const socialLifetime = total >= TIER_SOCIAL;

  let validityMs: number;
  if (tier === "free")    validityMs = TIER_FREE_VALIDITY_MS;
  else if (tier === "starter") validityMs = TIER_STARTER_VALIDITY_MS;
  else                    validityMs = TIER_VALIDITY_MS;

  const expiresAt = Date.now() + validityMs;
  const record: SubRecord = { tier, amount: total, activatedAt: Date.now(), expiresAt, socialLifetime };
  const ttlSeconds = Math.round(validityMs / 1000);
  await env.KV.put(`oracle:sub:${wallet}`, JSON.stringify(record), { expirationTtl: ttlSeconds });

  const tierLabels: Record<SubTier, string> = {
    unregistered: "Unregistered",
    free:         `Free — ${FREE_CALLS_PER_DAY} calls/day, 5 days`,
    starter:      `Starter — ${STARTER_CALLS_TOTAL} calls / 30 days`,
    social:       `Social — ${PAID_CALLS_PER_MONTH} calls/month, 30 days + lifetime social alerts`,
    pro:          `Pro — ${PRO_CALLS_PER_MONTH} calls/month, 30 days + compliance tools`,
    business:     "Business — unlimited calls + all 19 tools, 30 days",
  };

  return {
    success: true,
    tier,
    amount: total,
    socialLifetime,
    expiresAt: new Date(expiresAt).toISOString(),
    message: `${tierLabels[tier]} activated.${socialLifetime ? " Social Agent lifetime included." : ""}`,
  };
}
