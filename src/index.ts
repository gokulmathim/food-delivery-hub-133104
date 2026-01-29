import http from 'node:http';

/**
 * Parse a PORT value from env safely.
 */
function getPortFromEnv(): number {
  const raw = process.env.PORT ?? '3001';
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3001;
}

const port = getPortFromEnv();

const server = http.createServer((req, res) => {
  // Minimal health endpoint + root message.
  if (req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Food Delivery Hub service is running.\n');
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});
