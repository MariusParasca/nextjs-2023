import React from 'react';

interface Props {
  title: string;
  url: string;
}

export const SelectedPhoto = ({ title, url }: Props) => {
  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>{title}</h1>
      <img src={url} alt={title} width={500} height={500} />
    </div>
  );
};
