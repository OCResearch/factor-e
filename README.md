# factor-e

Product site for **factor-e**: websites and business systems for other businesses. The *e* is compounding — each rebuild, form, and hosting decision should make the next year cheaper to run.

This repo is the first usable slice:

- Marketing site
- Public booking (service → weekday/time → details → receipt)
- Admin roster: clients, work, hosting location
- Rebuild studio: paste a URL, choose a style, preview, edit, mock-deploy (hosting is recorded on the client)

Client data is in-memory for the session (Restore demo / Show empty in admin). No database or auth.

## Run locally

```bash
npm install
npm run dev
```

App: [http://127.0.0.1:4317](http://127.0.0.1:4317)

`npm run dev` uses webpack on port 4317. Production:

```bash
npm run build
npm start
```

## Routes

| Path | What it is |
| --- | --- |
| `/` | Marketing |
| `/book` | Booking flow |
| `/studio` | Rebuild studio |
| `/admin` | Clients |
| `/admin/clients/[id]` | Work + hosting |

Studio error demo: paste a URL containing `fail`. Admin empty demo: **Show empty**, then **Restore demo**.
