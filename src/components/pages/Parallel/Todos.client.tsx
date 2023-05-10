'use client';

import { getTodosQueryFn } from '@/queryFns/todosQueryFns';
import { ToDo } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const Todos = () => {
  const { data } = useQuery<ToDo[]>({
    queryKey: ['todos'],
    queryFn: getTodosQueryFn,
    // should use suspense to suspend, but suspense is not ready in react-query
  });

  if (!data) return <div>Not found</div>;

  return (
    <div style={{ border: '1px solid red', height: 500, width: 500, overflow: 'auto' }}>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};
