import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from 'react';

const queryClient = new QueryClient();

export const useApiQuery = (page, fx) =>{
    useQuery({
        queryKey: ['users', page],
        queryFn: () => fx(),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });

    return null;
}

export const useSmartQuery = (key, apiFx, params = {}) =>{
    const [page, setPage] = useState(1);

    const query = useQuery({
        queryKey: [key, params, page],
        queryFn: () => apiFx({
            ...params,
            page,
        }),
    });

    return {
        ...query,
        page,
        nextPage: () => setPage((p) => p + 1),
        prevPage: () => setPage((p) => Math.max(1, p - 1)),
        resetPage: () => setPage(1),
    };
}

export const ApiQueryProvider = ({children})=>{
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}