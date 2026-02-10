# Local 1776CASH Docker Stack (Testnet)

This stack is wired for local development with:

- Chain source: `/Users/m1chl/Desktop/PIVX`
- RPC bridge source: `/Users/m1chl/Desktop/PivxNodeController`
- Explorer source: `/Users/m1chl/Desktop/PIVX-BlockExplorer`

Services:

- `node` (1776 daemon, testnet)
- `rpc` (NodeController on `http://localhost:8082`)
- `explorer` (Blockbook on `http://localhost:8081`)
- `mpw` (wallet UI on `http://localhost:8080`)

## Start

```bash
cd /Users/m1chl/Desktop/MyPIVXWallet
docker compose up --build
```

## Optional path overrides

You can override source paths per run:

```bash
CHAIN_SRC_DIR=/path/to/1776CASH \
RPC_SRC_DIR=/path/to/PivxNodeController \
EXPLORER_SRC_DIR=/path/to/PIVX-BlockExplorer \
docker compose up --build
```

## Notes

- Wallet docker build uses `docker/chain_params.docker.json`, pointing to local `localhost:8081/8082`.
- Current setup is testnet-first.
