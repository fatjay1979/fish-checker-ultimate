'use client';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, CheckCircle, XCircle, Activity, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const store = useAppStore();
  const [stats, setStats] = useState({
    configured: false,
    wpConfigured: false,
    aiConfigured: false,
    activeEngine: store.activeEngine,
  });

  useEffect(() => {
    const wpConfigured = !!(store.wpUrl && store.wpUser && store.wpAppPassword);
    const aiConfigured = !!(store.openaiApiKey || store.perplexityApiKey);
    setStats({
      configured: wpConfigured && aiConfigured,
      wpConfigured,
      aiConfigured,
      activeEngine: store.activeEngine,
    });
  }, [store]);

  const features = [
    {
      title: 'WordPress Integration',
      description: 'Direkte Anbindung an deine WordPress-Datenbank',
      icon: Database,
      configured: stats.wpConfigured,
      link: '/settings'
    },
    {
      title: 'AI-Powered Analysis',
      description: 'OpenAI GPT-4o & Perplexity Sonar für Deep Research',
      icon: Zap,
      configured: stats.aiConfigured,
      link: '/settings'
    },
    {
      title: 'Batch Processing',
      description: 'Analysiere mehrere Posts gleichzeitig',
      icon: Activity,
      configured: stats.configured,
      link: '/batch'
    },
    {
      title: 'Smart Review System',
      description: 'Intelligente Vorschläge mit Accept/Reject',
      icon: CheckCircle,
      configured: stats.configured,
      link: '/posts'
    },
  ];

  const quickStats = [
    { label: 'WordPress', value: stats.wpConfigured ? 'Verbunden' : 'Nicht konfiguriert', status: stats.wpConfigured },
    { label: 'AI Engine', value: store.activeEngine === 'openai' ? 'OpenAI' : 'Perplexity', status: stats.aiConfigured },
    { label: 'Model', value: store.activeModel, status: stats.aiConfigured },
    { label: 'Status', value: stats.configured ? 'Ready' : 'Setup benötigt', status: stats.configured },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Willkommen zurück!
          </h1>
          <p className="text-slate-600">
            Dein AI-gestützter WordPress Data Validator ist bereit.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, i) => (
            <Card key={i} className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="text-lg font-bold mt-1">{stat.value}</p>
                  </div>
                  {stat.status ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-400" size={24} />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Setup Warning */}
        {!stats.configured && (
          <Card className="mb-8 border-yellow-300 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Activity size={20} />
                Setup erforderlich
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700 mb-4">
                Bitte konfiguriere deine WordPress-Verbindung und API-Keys in den Einstellungen.
              </p>
              <Link href="/settings">
                <Button variant="default">Zu den Einstellungen</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="hover:shadow-lg transition-all cursor-pointer border-2">
                  <Link href={feature.link}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${feature.configured ? 'bg-green-100' : 'bg-slate-100'}`}>
                            <Icon className={feature.configured ? 'text-green-600' : 'text-slate-400'} size={24} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                            <Badge variant={feature.configured ? 'default' : 'secondary'} className="mt-1">
                              {feature.configured ? 'Aktiv' : 'Setup'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        {stats.configured && (
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Link href="/posts">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Posts analysieren
                  </Button>
                </Link>
                <Link href="/batch">
                  <Button size="lg" variant="outline">
                    Batch-Analyse starten
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button size="lg" variant="outline">
                    Einstellungen
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}