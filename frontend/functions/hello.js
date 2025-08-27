export default function onRequest(context) {
  return new Response(`Hello ${context.params.user}`);
}