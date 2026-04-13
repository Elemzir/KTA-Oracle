export function requireInternalAuth(request: Request, secret: string): Response | null {
  if (request.headers.get("X-Internal-Secret") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
