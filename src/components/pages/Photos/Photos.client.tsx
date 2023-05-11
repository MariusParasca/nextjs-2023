'use client';

import { getPhotosQueryFn } from '@/queryFns/photosQueryFns';
import { Photo } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

function Photos() {
  const { data, isLoading } = useQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: getPhotosQueryFn,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Not found</div>;

  return (
    <div>
      {data.map((photo) => (
        <div key={photo.id} style={{ marginBottom: 20 }}>
          <Link href={`/photos/${photo.id}`}>{photo.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default Photos;
