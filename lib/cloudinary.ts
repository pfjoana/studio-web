export function getCloudinaryUrl(baseUrl: string, options = 'q_auto,f_auto,dpr_auto') {
  if (!baseUrl.includes('/upload/')) return baseUrl
  return baseUrl.replace('/upload/', `/upload/${options}/`);
}
