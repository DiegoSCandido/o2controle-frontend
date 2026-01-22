import { useAuth } from "@/contexts/AuthContext";
import { useClientes } from "@/hooks/useClientes";
import { useAlvaras } from "@/hooks/useAlvaras";
import { StatCard } from "@/components/StatCard";

const Dashboard = () => {
  const { user } = useAuth();
  const { clientes, isLoading: isLoadingClientes } = useClientes();
  const { alvaras, isLoading: isLoadingAlvaras } = useAlvaras();

  return (
    <div className="p-6 sm:p-8 md:p-10">
      {/* Top spacing for mobile */}
      <div className="mt-20 lg:mt-0" />

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Bem-vindo
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          {user?.fullName}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total de Clientes */}
        <StatCard
          title="Total de Clientes"
          value={clientes.length}
          isLoading={isLoadingClientes}
          description="Clientes cadastrados no sistema"
          variant="default"
        />

        {/* Total de Alvarás */}
        <StatCard
          title="Total de Alvarás"
          value={alvaras.length}
          isLoading={isLoadingAlvaras}
          description="Alvarás em registro"
          variant="default"
        />

        {/* Total de Certificados (Futura implementação) */}
        <StatCard
          title="Total de Certificados"
          value={0}
          isLoading={false}
          description="Será implementado em breve"
          variant="default"
        />
      </div>
    </div>
  );
};

export default Dashboard;
