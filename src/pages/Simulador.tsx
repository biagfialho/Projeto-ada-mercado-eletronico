import { MainLayout } from '@/components/layout/MainLayout';
import { FlaskConical } from 'lucide-react';

export default function Simulador() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Simulador de Cenários</h1>
          <p className="text-muted-foreground mt-1">
            Simule diferentes cenários econômicos e avalie seus impactos
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
          <FlaskConical className="h-12 w-12" />
          <p className="text-lg font-medium">Em breve</p>
          <p className="text-sm">Esta funcionalidade está em desenvolvimento.</p>
        </div>
      </div>
    </MainLayout>
  );
}
