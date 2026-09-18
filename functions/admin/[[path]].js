export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  if (url.pathname.includes('.')) {
    return context.env.ASSETS.fetch(context.request);
  }
  
  const indexUrl = new URL('/admin/index.html', url.origin);
  return context.env.ASSETS.fetch(new Request(indexUrl, context.request));
}