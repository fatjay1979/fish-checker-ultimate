'use client';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { fetchPosts } from '@/lib/wordpress';
import Link from 'next/link';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const store = useAppStore();
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!store.wpUrl) return;
    fetchPosts({ ...store, getAuthHeader: store.getAuthHeader })
      .then(setPosts)
      .catch(e => setError(e.message));
  }, []);

  if (!store.wpUrl) return <div className="p-20 text-center"><h1 className="text-2xl mb-4">Fish Checker Enterprise</h1><Link href="/settings"><Button>Einstellungen öffnen</Button></Link></div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Datenbank: {store.cptSlug}</h1>
        <Link href="/settings"><Button variant="secondary">Settings</Button></Link>
      </div>
      {error && <div className="bg-red-100 text-red-600 p-4 rounded mb-4">{error}</div>}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/check/${post.id}`}>
            <Card className="p-5 hover:shadow-md transition cursor-pointer flex justify-between items-center">
              <div>
                <CardTitle dangerouslySetInnerHTML={{__html: post.title.rendered}} className="mb-2" />
                <Badge variant="outline">ID: {post.id}</Badge>
              </div>
              <Button variant="outline">Prüfen &rarr;</Button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}