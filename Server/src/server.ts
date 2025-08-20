import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/health', (_req, res) => res.json({ ok: true, service: 'server', time: new Date().toISOString() }));

// Example endpoint that could proxy/call Worker API if needed
app.get('/api/server-info', (_req, res) => {
  res.json({
    service: 'express',
    note: 'Use this for heavier features (uploads, streaming, sockets, etc.)'
  });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Server listening on http://0.0.0.0:${port}`));
