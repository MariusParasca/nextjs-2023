import Hydrate from '@/components/Hydrate/Hydrate.client';
import { Todos } from '@/components/pages/Parallel/Todos.client';
import { prefetch } from '@/lib/reactQueryClientServer';
import { getTodosQueryFn } from '@/queryFns/todosQueryFns';

export default async function ParallelPageToDos() {
  const dehydratedState = await prefetch(['todos'], getTodosQueryFn);

  return (
    <Hydrate state={dehydratedState}>
      <Todos />
    </Hydrate>
  );
}
