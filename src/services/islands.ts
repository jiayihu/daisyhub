export function getIslands() {
  return ['Tom', 'Nook'];
}

export function getIsland(id: string) {
  if (id === '2') throw new Error('Island not found');

  return {
    id,
    name: 'Tom',
  };
}
