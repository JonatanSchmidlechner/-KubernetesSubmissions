import { connect } from 'nats';
const initNats = async () => {
  while (true) {
    try {
      const nc = await connect({
        servers: [process.env.NATS_URL || 'nats://my-nats:4222'],
      });
      return nc;
    } catch (err) {
      console.log('Nats not ready, retrying in 5s...', err);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
};

export const nc = initNats();
