import { MainLayout } from '@/components/layout/MainLayout';
import { Building2 } from 'lucide-react';

export default function Institucional() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Institucional</h1>
          <p className="text-muted-foreground mt-1">
            Conheça mais sobre o Economic Insights
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
          <Building2 className="h-12 w-12" />
          <p className="text-lg font-medium">Em breve</p>
          <p className="text-sm">Esta funcionalidade está em desenvolvimento.</p>
        </div>
      </div>
    </MainLayout>
  );
}
