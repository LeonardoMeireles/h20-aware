//Min time for a cactus to spawn
import { CactusConfig } from '../components/Cactus';

export const CACTUS_INTERVAL_MIN = 50;

//Max time for a cactus to spawn
export const CACTUS_INTERVAL_MAX = 250;

export const DEFAULT_CACTUS: CactusConfig = {
  nextCactusTime: CACTUS_INTERVAL_MIN,
  cacti: []
};