import { Artist } from './spotify.types';

export function artistsToCsv(artists: Artist[]): string {
  const header = [
    'id',
    'name',
    'genres',
    'imageUrl',
    'popularity',
    'followers',
  ];

  const rows = artists.map((a) => [
    a.id,
    a.name,
    (a.genres || []).join('|'),
    a.imageUrl ?? '',
    a.popularity ?? '',
    a.followers ?? '',
  ]);

  const csvArray = [
    header,
    ...rows,
  ];

  return csvArray
    .map((row) =>
      row
        .map((value) => {
          const str = String(value ?? '');
          // Doppelte Quotes escapen und Feld in Quotes packen
          const escaped = str.replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(','),
    )
    .join('\n');
}
