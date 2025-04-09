export function getCloudinaryUrl(baseUrl: string, options = 'q_100,f_auto') {
  if (!baseUrl.includes('/upload/')) return baseUrl
  return baseUrl.replace('/upload/', `/upload/${options}/`);
}
