'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { fetchSinglePost, updatePostInWordPress } from '@/lib/wordpress';
import { runAnalysis } from '@/app/actions/analyze';
import { ReviewCard } from '@/components/ReviewCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CheckPage() {
  const { id } = useParams();
  const store = useAppStore();
  const [post, setPost] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [finalChanges, setFinalChanges] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [engine, setEngine] = useState(store.activeEngine);
  const [model, setModel] = useState(store.activeModel);

  useEffect(() => { if(id) fetchSinglePost(Number(id), { ...store, getAuthHeader: store.getAuthHeader }).then(setPost); }, [id]);

  const startResearch = async () => {
    setLoading(true); setResult(null); setFinalChanges({});
    const apiKey = engine === 'openai' ? store.openaiApiKey : store.perplexityApiKey;
    const res = await runAnalysis(post, { engine, model, apiKey, systemPrompt: store.systemPrompt });
    if (res.success) setResult(res.data);
    else alert(res.error);
    setLoading(false);
  };

  const handleDecision = (key: string, val: any, status: string) => {
    setFinalChanges((prev: any) => {
      const c = { ...prev };
      if (status === 'accepted') c[key] = val; else delete c[key];
      return c;
    });
  };

  const saveToWP = async () => {
    setIsSaving(true);
    try {
      await updatePostInWordPress(Number(id), finalChanges, { ...store, getAuthHeader: store.getAuthHeader });
      alert("Gespeichert!");
      window.location.reload();
    } catch (e: any) { alert(e.message); }
    setIsSaving(false);
  };

  if (!post) return <div className="p-10">Lade...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded shadow-sm">
          <div className="flex items-center gap-4">
             <Link href="/"><ArrowLeft /></Link>
             <h1 className="text-xl font-bold" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
          </div>
          <div className="flex gap-2">
             <Select value={engine} onValueChange={(v: any) => setEngine(v)}><SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="perplexity">Perplexity</SelectItem><SelectItem value="openai">OpenAI</SelectItem></SelectContent></Select>
             <Select value={model} onValueChange={setModel}><SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="sonar-reasoning">Sonar Reas.</SelectItem><SelectItem value="gpt-4o">GPT-4o</SelectItem></SelectContent></Select>
             <Button onClick={startResearch} disabled={loading}>{loading ? <Loader2 className="animate-spin"/> : "Deep Research"}</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
           <div className="space-y-4">
             {result && (
                <div className="sticky top-4 z-10 bg-blue-600 text-white p-4 rounded flex justify-between items-center shadow-lg">
                  <span className="font-bold">{Object.keys(finalChanges).length} Änderungen bereit</span>
                  <Button onClick={saveToWP} disabled={isSaving} variant="secondary" size="sm">{isSaving ? <Loader2 className="animate-spin"/> : <Save className="mr-2"/>} An WP senden</Button>
                </div>
             )}
             {result && result.fields?.map((f: any, i: number) => <ReviewCard key={i} field={f} onDecision={handleDecision} />)}
           </div>

           <div className="h-[80vh] sticky top-6 bg-white rounded border overflow-hidden flex flex-col">
              <div className="p-2 bg-slate-100 font-bold text-sm border-b">Original Daten</div>
              <ScrollArea className="flex-1 p-4">
                <div dangerouslySetInnerHTML={{__html: post.content.rendered}} className="prose prose-sm mb-6" />
                <pre className="text-xs bg-slate-900 text-green-400 p-4 rounded overflow-auto">{JSON.stringify(post.meta || post.acf, null, 2)}</pre>
              </ScrollArea>
           </div>
        </div>
      </div>
    </div>
  );
}