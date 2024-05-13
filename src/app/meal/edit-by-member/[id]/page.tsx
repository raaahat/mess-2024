import React from 'react';

export default function EditBySingleId({ params }: { params: { id: string } }) {
  return (
    <div>
      EditBySingleId
      <div>{params.id}</div>
    </div>
  );
}
