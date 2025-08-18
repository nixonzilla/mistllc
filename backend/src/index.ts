export default {
  async fetch(_request: any, env: { KV: { put: (arg0: string, arg1: string) => any; get: (arg0: string) => any; list: () => any; delete: (arg0: string) => any; }; }, _ctx: any) {
    // write a key-value pair
    await env.KV.put('KEY', 'VALUE');

    // read a key-value pair
    const value = await env.KV.get('KEY');

    // list all key-value pairs
    const allKeys = await env.KV.list();

    // delete a key-value pair
    await env.KV.delete('KEY');

    // return a Workers response
    return new Response(
      JSON.stringify({
        value: value,
        allKeys: allKeys,
      }),
    );
  } 
}