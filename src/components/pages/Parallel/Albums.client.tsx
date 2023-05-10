'use client';

import { getAlbumsQueryFn } from '@/queryFns/albumsQueryFns';
import { Album } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const Albums = () => {
  const { data } = useQuery<Album[]>({
    queryKey: ['albums'],
    queryFn: getAlbumsQueryFn,
    // should use suspense to suspend, but suspense is not ready in react-query
  });

  if (!data) return <div>Not found</div>;

  return (
    <div style={{ border: '1px solid red', height: 500, width: 500, overflow: 'auto' }}>
      <ul>
        {data.map((album) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </div>
  );
};
