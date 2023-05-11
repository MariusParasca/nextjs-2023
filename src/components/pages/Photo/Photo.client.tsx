'use client';

import { Modal } from '@/components/Modal/Modal';
import { SelectedPhoto } from '@/components/SelectedPhoto/SelectedPhoto';
import { getPhotoQueryFn } from '@/queryFns/photosQueryFns';
import { Photo as PhotoType } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

function Photo() {
  const params = useParams();
  const photoId = params?.photoId as string;

  const { data, isLoading } = useQuery<PhotoType>({
    queryKey: ['photos', photoId],
    queryFn: getPhotoQueryFn(photoId),
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Not found</div>;

  return <SelectedPhoto title={data.title} url={data.url} />;
}

export default Photo;

export const PhotoModal = () => {
  const { push } = useRouter();

  return (
    <Modal
      open
      onClose={() => {
        push('/feed');
      }}
    >
      <Photo />
    </Modal>
  );
};
