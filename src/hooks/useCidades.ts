import { useState, useEffect } from 'react';

interface Cidade {
  id: number;
  nome: string;
}

export function useCidades(uf: string) {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uf || uf.trim() === '') {
      setCidades([]);
      setError(null);
      return;
    }

    const buscarCidades = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Buscar UF ID primeiro
        const ufsResponse = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        
        if (!ufsResponse.ok) {
          throw new Error('Erro ao buscar estados');
        }

        const ufs = await ufsResponse.json();
        
        if (!Array.isArray(ufs)) {
          throw new Error('Resposta inválida da API de estados');
        }

        const estadoSelecionado = ufs.find((estado: any) => estado.sigla === uf.toUpperCase());

        if (!estadoSelecionado) {
          setError('Estado não encontrado');
          setCidades([]);
          return;
        }

        // Buscar cidades do estado
        const cidadesResponse = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado.id}/municipios`
        );

        if (!cidadesResponse.ok) {
          throw new Error('Erro ao buscar cidades');
        }

        const cidadesData = await cidadesResponse.json();

        if (!Array.isArray(cidadesData)) {
          throw new Error('Resposta inválida da API de cidades');
        }

        // Validar dados antes de ordenar
        const cidadesValidas = cidadesData.filter(
          (cidade) => cidade && typeof cidade.nome === 'string' && typeof cidade.id === 'number'
        );

        // Ordenar alfabeticamente com fallback seguro
        const cidadesOrdenadas = cidadesValidas.sort((a: Cidade, b: Cidade) => {
          try {
            return a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' });
          } catch (err) {
            // Fallback simples se localeCompare falhar
            return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
          }
        });

        setCidades(cidadesOrdenadas);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao buscar cidades';
        setError(message);
        console.error('Erro ao buscar cidades:', err);
        setCidades([]);
      } finally {
        setIsLoading(false);
      }
    };

    buscarCidades();
  }, [uf]);

  return { cidades, isLoading, error };
}

