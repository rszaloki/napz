```
nvm use
npm install
npm run generate
npm run dbpush
npm run dev
```

- if you change the `schema.zmodel`, then run `npm run generate`
- if you add new models to the `schema.zmodel`, then run `npm run generate && npm run dbpush`
- the db is here: `prisma/dev.db`
- there are `/api/model/[modelname]` api routes!
