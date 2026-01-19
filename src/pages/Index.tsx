import o2conLogo from '@/assets/o2contole-logo.png';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 lg:top-0 z-10 lg:mt-0 mt-16">
        <div className="container px-4 py-4 lg:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <img 
              src={o2conLogo}
              alt="O2con Soluções Contábeis" 
              className="h-8 sm:h-10 object-contain"
            />
            <div className="hidden sm:block h-8 w-px bg-border" />
            <div>
              <h1 className="text-base sm:text-lg font-bold text-foreground">O2controle</h1>
              <p className="text-xs text-muted-foreground">
                Controle de documentos e vencimentos
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 w-full">
        {/* Página inicial limpa */}
      </main>
    </div>
  );
};

export default Index;
