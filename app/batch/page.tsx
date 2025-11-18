'use client';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { fetchPosts } from '@/lib/wordpress';
import { runAnalysis } from '@/app/actions/analyze';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Loader2, Play, CheckCircle, XCircle } from 'lucide-react';

export default function BatchPage() {
  const store = useAppStore();
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (store.wpUrl) {
      fetchPosts({ ...store, getAuthHeader: store.getAuthHeader })
        .then(setPosts)
        .catch(console.error);
    }
  }, [store.wpUrl]);

  const togglePost = (id: number) => {
    setSelectedPosts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedPosts(posts.map(p => p.id));
  };

  const deselectAll = () => {
    setSelectedPosts([]);
  };

  const runBatchAnalysis = async () => {
    if (selectedPosts.length === 0) return;

    setRunning(true);
    setResults([]);
    setProgress(0);

    const apiKey = store.activeEngine === 'openai' ? store.openaiApiKey : store.perplexityApiKey;

    for (let i = 0; i < selectedPosts.length; i++) {
      const postId = selectedPosts[i];
      const post = posts.find(p => p.id === postId);

      if (post) {
        const result = await runAnalysis(post, {
          engine: store.activeEngine,
          model: store.activeModel,
          apiKey,
          systemPrompt: store.systemPrompt
        });

        setResults(prev => [...prev, { postId, post, result }]);
      }

      setProgress(((i + 1) / selectedPosts.length) * 100);
    }

    setRunning(false);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Batch-Analyse</h1>
        <p className="text-slate-600">Analysiere mehrere Posts gleichzeitig mit AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Post Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Posts auswählen</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={selectAll}>
                  Alle
                </Button>
                <Button size="sm" variant="outline" onClick={deselectAll}>
                  Keine
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {posts.map(post => (
                <div key={post.id} className="flex items-center gap-3 p-3 border rounded hover:bg-slate-50">
                  <Checkbox
                    checked={selectedPosts.includes(post.id)}
                    onCheckedChange={() => togglePost(post.id)}
                  />
                  <div className="flex-1">
                    <div dangerouslySetInnerHTML={{__html: post.title.rendered}} className="font-medium" />
                    <Badge variant="outline" className="mt-1">ID: {post.id}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Analyse starten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Ausgewählt:</span>
                <Badge>{selectedPosts.length} Posts</Badge>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Engine:</span>
                <Badge variant="secondary">{store.activeEngine}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Model:</span>
                <Badge variant="secondary">{store.activeModel}</Badge>
              </div>
            </div>

            {running && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fortschritt</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            <Button
              onClick={runBatchAnalysis}
              disabled={selectedPosts.length === 0 || running}
              className="w-full"
              size="lg"
            >
              {running ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Analysiere...
                </>
              ) : (
                <>
                  <Play className="mr-2" size={18} />
                  Batch-Analyse starten
                </>
              )}
            </Button>

            {/* Results */}
            {results.length > 0 && (
              <div className="mt-6 space-y-2">
                <h3 className="font-bold">Ergebnisse:</h3>
                <div className="max-h-[400px] overflow-y-auto space-y-2">
                  {results.map((r, i) => (
                    <div key={i} className="p-3 border rounded flex items-center gap-3">
                      {r.result.success ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <XCircle className="text-red-500" size={20} />
                      )}
                      <div className="flex-1">
                        <div className="font-medium" dangerouslySetInnerHTML={{__html: r.post.title.rendered}} />
                        {r.result.success && (
                          <Badge variant="outline" className="mt-1">
                            {r.result.data.fields?.length || 0} Felder analysiert
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}