import { connect, JSONCodec } from 'nats';

const initNats = async () => {
  while (true) {
    try {
      const nc = await connect({
        servers: [process.env.NATS_URL || 'nats://my-nats:4222'],
      });
      return nc;
    } catch (err) {
      console.log('Nats not ready, retrying in 5s...');
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
};

const startSubscriber = async () => {
  const sub = conn.subscribe('alerts');
  const jc = JSONCodec();
  for await (const msg of sub) {
    const data = jc.decode(msg.data);
    console.log(`[${sub.getProcessed()}]: ${jc.decode(data)}`);
    const res = await fetch(process.env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `A todo was ${data.type}: ${data.type.todo}`,
      }),
    });
  }
};

const conn = await initNats();
startSubscriber();
