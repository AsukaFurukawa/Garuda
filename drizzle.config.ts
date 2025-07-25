import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema',
    dialect: 'sqlite',
    dbCredentials: {
        url: './threat-intel.db',
    },
});
