'use client';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { fetchPosts } from '@/lib/wordpress';
import Link from 'next/link';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';

export default function PostsPage() {
  const store = useAppStore();
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!store.wpUrl) {
      setError('WordPress nicht konfiguriert');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchPosts({ ...store, getAuthHeader: store.getAuthHeader })
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, [store.wpUrl]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(post =>
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  if (!store.wpUrl) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl mb-4">WordPress nicht konfiguriert</h1>
        <Link href="/settings">
          <Button>Zu den Einstellungen</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Posts Übersicht</h1>
          <p className="text-slate-600 mt-1">CPT: {store.cptSlug}</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {filteredPosts.length} Posts
        </Badge>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <Input
          placeholder="Posts durchsuchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin mr-2" />
          <span>Lade Posts...</span>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/check/${post.id}`}>
              <Card className="p-5 hover:shadow-lg transition cursor-pointer border-2 hover:border-blue-400">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <CardTitle
                      dangerouslySetInnerHTML={{__html: post.title.rendered}}
                      className="mb-2"
                    />
                    <div className="flex gap-2 items-center">
                      <Badge variant="outline">ID: {post.id}</Badge>
                      <Badge variant="secondary">
                        {new Date(post.modified).toLocaleDateString('de-DE')}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="default">
                    Analysieren &rarr;
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          Keine Posts gefunden.
        </div>
      )}
    </div>
  );
}