/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
declare const _default: {
    fetch(_request: any, env: {
        KV: {
            put: (arg0: string, arg1: string) => any;
            get: (arg0: string) => any;
            list: () => any;
            delete: (arg0: string) => any;
        };
    }, _ctx: any): Promise<Response>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map