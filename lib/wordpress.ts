export async function fetchPosts(settings: any) {
  const { wpUrl, cptSlug, getAuthHeader } = settings;
  const headers = { 'Authorization': getAuthHeader(), 'Content-Type': 'application/json' };
  const res = await fetch(`${wpUrl}/wp-json/wp/v2/${cptSlug}?per_page=50`, { headers });
  if (!res.ok) throw new Error(`Fehler: ${res.status}`);
  return res.json();
}

export async function fetchSinglePost(id: number, settings: any) {
  const { wpUrl, cptSlug, getAuthHeader } = settings;
  const headers = { 'Authorization': getAuthHeader() };
  const res = await fetch(`${wpUrl}/wp-json/wp/v2/${cptSlug}/${id}`, { headers });
  return res.json();
}

export async function updatePostInWordPress(id: number, changes: any, settings: any) {
  const { wpUrl, cptSlug, getAuthHeader } = settings;
  const coreFields = ['title', 'content', 'excerpt'];
  const payload: any = { meta: {} };

  for (const [key, value] of Object.entries(changes)) {
    if (coreFields.includes(key.toLowerCase())) {
      payload[key.toLowerCase()] = value;
    } else {
      payload.meta[key] = value;
    }
  }

  const res = await fetch(`${wpUrl}/wp-json/wp/v2/${cptSlug}/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Update fehlgeschlagen');
  }
  return res.json();
}