'use client';
import { useAppStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const store = useAppStore();
  const [local, setLocal] = useState(store);

  const save = () => { store.setSettings(local); alert('Gespeichert!'); };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profi-Einstellungen</h1>
        <Link href="/"><Button variant="outline">Zurück</Button></Link>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader><CardTitle>API Zugänge</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div><label className="text-sm font-bold">Perplexity Key</label><Input type="password" value={local.perplexityApiKey} onChange={e => setLocal({...local, perplexityApiKey: e.target.value})} /></div>
               <div><label className="text-sm font-bold">OpenAI Key</label><Input type="password" value={local.openaiApiKey} onChange={e => setLocal({...local, openaiApiKey: e.target.value})} /></div>
             </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardHeader><CardTitle>System Prompt</CardTitle></CardHeader>
          <CardContent><Textarea rows={10} className="font-mono text-sm" value={local.systemPrompt} onChange={e => setLocal({...local, systemPrompt: e.target.value})} /></CardContent>
        </Card>
        <Card>
           <CardHeader><CardTitle>WordPress Verbindung</CardTitle></CardHeader>
           <CardContent className="space-y-4">
             <Input placeholder="URL (https://...)" value={local.wpUrl} onChange={e => setLocal({...local, wpUrl: e.target.value})} />
             <div className="grid grid-cols-2 gap-4">
                <Input placeholder="User" value={local.wpUser} onChange={e => setLocal({...local, wpUser: e.target.value})} />
                <Input type="password" placeholder="App Password" value={local.wpAppPassword} onChange={e => setLocal({...local, wpAppPassword: e.target.value})} />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <Input placeholder="CPT Slug (z.B. tierfische)" value={local.cptSlug} onChange={e => setLocal({...local, cptSlug: e.target.value})} />
             </div>
             <Button onClick={save} className="w-full mt-4">Speichern</Button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}