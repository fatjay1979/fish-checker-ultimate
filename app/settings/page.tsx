'use client';
import { useAppStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { testWordPressConnection, testOpenAIConnection, testPerplexityConnection } from '@/app/actions/test-api';
import { Loader2, CheckCircle, XCircle, Zap } from 'lucide-react';

export default function SettingsPage() {
  const store = useAppStore();
  const [local, setLocal] = useState(store);
  const [testResults, setTestResults] = useState<any>({});
  const [testing, setTesting] = useState<string | null>(null);

  const save = () => {
    store.setSettings(local);
    alert('Gespeichert!');
  };

  const runTest = async (type: 'wp' | 'openai' | 'perplexity') => {
    setTesting(type);
    let result: any;

    try {
      if (type === 'wp') {
        result = await testWordPressConnection(local.wpUrl, local.wpUser, local.wpAppPassword, local.cptSlug);
      } else if (type === 'openai') {
        result = await testOpenAIConnection(local.openaiApiKey);
      } else {
        result = await testPerplexityConnection(local.perplexityApiKey);
      }

      setTestResults((prev: any) => ({ ...prev, [type]: result }));
    } catch (error: any) {
      setTestResults((prev: any) => ({ ...prev, [type]: { success: false, error: error.message } }));
    }

    setTesting(null);
  };

  const TestResult = ({ type }: { type: string }) => {
    const result = testResults[type];
    if (!result) return null;

    return (
      <div className={`mt-2 p-3 rounded-lg border-2 ${result.success ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
        <div className="flex items-start gap-2">
          {result.success ? (
            <CheckCircle className="text-green-600 mt-0.5" size={18} />
          ) : (
            <XCircle className="text-red-600 mt-0.5" size={18} />
          )}
          <div className="flex-1">
            <p className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.success ? result.message : 'Fehler'}
            </p>
            {result.error && (
              <p className="text-sm text-red-700 mt-1">{result.error}</p>
            )}
            {result.data && (
              <pre className="text-xs mt-2 bg-white p-2 rounded overflow-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Einstellungen</h1>
        <p className="text-slate-600">Konfiguriere deine WordPress-Verbindung und AI-APIs</p>
      </div>

      <div className="grid gap-6">
        {/* WordPress Connection */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                WordPress Verbindung
                {testResults.wp?.success && <Badge className="bg-green-600">Verbunden</Badge>}
              </CardTitle>
              <Button
                onClick={() => runTest('wp')}
                disabled={!local.wpUrl || !local.wpUser || !local.wpAppPassword || testing === 'wp'}
                variant="outline"
              >
                {testing === 'wp' ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} />}
                <span className="ml-2">Verbindung testen</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <label className="text-sm font-bold mb-2 block">WordPress URL</label>
              <Input
                placeholder="https://your-site.com"
                value={local.wpUrl}
                onChange={e => setLocal({...local, wpUrl: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold mb-2 block">Username</label>
                <Input
                  placeholder="admin"
                  value={local.wpUser}
                  onChange={e => setLocal({...local, wpUser: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">App Password</label>
                <Input
                  type="password"
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={local.wpAppPassword}
                  onChange={e => setLocal({...local, wpAppPassword: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold mb-2 block">Custom Post Type Slug</label>
              <Input
                placeholder="tierfische"
                value={local.cptSlug}
                onChange={e => setLocal({...local, cptSlug: e.target.value})}
              />
            </div>
            <TestResult type="wp" />
          </CardContent>
        </Card>

        {/* AI Engine Selection */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-white">
            <CardTitle>AI Engine Auswahl</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold mb-2 block">Active Engine</label>
                <Select value={local.activeEngine} onValueChange={(v: any) => setLocal({...local, activeEngine: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perplexity">Perplexity (Empfohlen)</SelectItem>
                    <SelectItem value="openai">OpenAI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-bold mb-2 block">Model</label>
                <Select value={local.activeModel} onValueChange={v => setLocal({...local, activeModel: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {local.activeEngine === 'perplexity' ? (
                      <>
                        <SelectItem value="sonar-reasoning">Sonar Reasoning (Best)</SelectItem>
                        <SelectItem value="sonar">Sonar</SelectItem>
                        <SelectItem value="sonar-pro">Sonar Pro</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white">
            <CardTitle>API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold">Perplexity API Key</label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => runTest('perplexity')}
                  disabled={!local.perplexityApiKey || testing === 'perplexity'}
                >
                  {testing === 'perplexity' ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} />}
                  <span className="ml-1">Test</span>
                </Button>
              </div>
              <Input
                type="password"
                placeholder="pplx-..."
                value={local.perplexityApiKey}
                onChange={e => setLocal({...local, perplexityApiKey: e.target.value})}
              />
              <TestResult type="perplexity" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold">OpenAI API Key</label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => runTest('openai')}
                  disabled={!local.openaiApiKey || testing === 'openai'}
                >
                  {testing === 'openai' ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} />}
                  <span className="ml-1">Test</span>
                </Button>
              </div>
              <Input
                type="password"
                placeholder="sk-..."
                value={local.openaiApiKey}
                onChange={e => setLocal({...local, openaiApiKey: e.target.value})}
              />
              <TestResult type="openai" />
            </div>
          </CardContent>
        </Card>

        {/* System Prompt */}
        <Card className="border-2 border-yellow-200">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-white">
            <CardTitle>System Prompt (Erweitert)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea
              rows={12}
              className="font-mono text-sm"
              value={local.systemPrompt}
              onChange={e => setLocal({...local, systemPrompt: e.target.value})}
            />
            <p className="text-xs text-slate-500 mt-2">
              Dieser Prompt steuert, wie die AI deine Daten analysiert. Änderungen hier beeinflussen die Qualität der Ergebnisse.
            </p>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={save} size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Alle Einstellungen speichern
        </Button>
      </div>
    </div>
  );
}