import PAIR_FACTORY_JSON from "./PAIR_FACTORY_ABI.json"
import TOKEN_FACTORY_JSON from "./TOKEN_FACTORY_ABI.json"

export const PAIR_FACTORY = PAIR_FACTORY_JSON;
export const TOKEN_FACTORY = TOKEN_FACTORY_JSON;

// Contract addresses dari environment variables
export const CONTRACTS = {
    PAIR_FACTORY: "0xAaCdC2363B1A3bD5d1d11802db4c5659C4Fa8562",
    TOKEN_FACTORY: '0xae052faFbfc9eCeCdf833dd3146876f423554cB9',
} as const;
