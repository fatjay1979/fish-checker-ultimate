'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Check, X, Edit2, RotateCcw, Save } from 'lucide-react';

export function ReviewCard({ field, onDecision }: any) {
  const [status, setStatus] = useState('pending');
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(field.correction || field.originalValue);
  const dbKey = field.metaKey || field.fieldName;

  const handleAccept = () => {
    setStatus('accepted');
    setIsEditing(false);
    onDecision(dbKey, currentValue, 'accepted');
  };

  const handleReject = () => {
    setStatus('rejected');
    setIsEditing(false);
    onDecision(dbKey, null, 'rejected');
  };

  const borderColor = status === 'accepted' ? 'border-green-500 bg-green-50'
                    : status === 'rejected' ? 'border-slate-200 opacity-60'
                    : field.status === 'incorrect' ? 'border-red-300 bg-red-50' : 'border-green-200';

  return (
    <Card className={`transition-all duration-300 border-2 ${borderColor}`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col">
           <CardTitle className="text-base font-bold flex items-center gap-2">
             {field.readableLabel || field.fieldName}
             {status === 'accepted' && <Badge className="bg-green-600">Akzeptiert</Badge>}
             {status === 'rejected' && <Badge variant="secondary">Verworfen</Badge>}
           </CardTitle>
           <code className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1 rounded w-fit mt-1">Key: {dbKey}</code>
        </div>
        <div className="flex gap-1">
          {status === 'pending' && (
            <>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}><Edit2 size={14} /></Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleAccept}><Check size={16} /></Button>
              <Button size="sm" variant="destructive" onClick={handleReject}><X size={16} /></Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 space-y-3">
        {isEditing ? (
          <div className="space-y-2">
            <Textarea value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} className="min-h-[100px] bg-white" />
            <Button size="sm" onClick={handleAccept} className="w-full">Speichern</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            <div className="text-xs text-slate-500"><span className="font-bold uppercase mr-2">Original:</span><span className="font-mono bg-white px-1 rounded border">{field.originalValue}</span></div>
            <div className="relative">
               <span className="text-xs font-bold uppercase mr-2 text-slate-700">{status === 'accepted' ? 'Neu:' : 'Vorschlag:'}</span>
               <div className="p-3 rounded border font-medium text-sm bg-white">{currentValue}</div>
            </div>
          </div>
        )}
        {status === 'pending' && field.status !== 'correct' && <div className="text-xs text-slate-600 bg-white/50 p-2 rounded mt-2 italic">"{field.reason}"</div>}
        {field.sources && <div className="text-xs text-blue-600 mt-1">Quellen: {field.sources.join(', ')}</div>}
      </CardContent>
    </Card>
  );
}