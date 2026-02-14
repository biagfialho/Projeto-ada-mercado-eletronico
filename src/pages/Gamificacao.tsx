import { MainLayout } from '@/components/layout/MainLayout';
import { Gamepad2 } from 'lucide-react';

export default function Gamificacao() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Área de Gamificação</h1>
          <p className="text-muted-foreground mt-1">
            Aprenda jogando e acumule pontos com seus conhecimentos econômicos
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
          <Gamepad2 className="h-12 w-12" />
          <p className="text-lg font-medium">Em breve</p>
          <p className="text-sm">Esta funcionalidade está em desenvolvimento.</p>
        </div>
      </div>
    </MainLayout>
  );
}
