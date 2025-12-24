export function normalizeNameForLookup(name?: string) {
  if (!name) return '';
  return String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
}

const imagesByKey: Record<string, any> = {
  [normalizeNameForLookup('Francistown Masjid')]: require('../assets/images/Francistown-Masjid.jpg'),
  [normalizeNameForLookup('Jamia Masjid Gaborone')]: require('../assets/images/Jamia-Masjid-Gaborone.jpg'),
  [normalizeNameForLookup('Kanye Masjid')]: require('../assets/images/Kanye-Masjid.jpg'),
  [normalizeNameForLookup('Lethlakane Masjid')]: require('../assets/images/Lethlakane-Masjid.jpg'),
  [normalizeNameForLookup('Lobatse Masjid')]: require('../assets/images/Lobatse-Masjid.jpg'),
  [normalizeNameForLookup('Mahalapye Masjid')]: require('../assets/images/Mahalapye-Masjid.jpg'),
  [normalizeNameForLookup('Masjid Dun Noor Gwest')]: require('../assets/images/Masjid-Dun-Noor-Gwest.jpg'),
  [normalizeNameForLookup('Masjid Ut Taqwa Block 6')]: require('../assets/images/Masjid-Ut-Taqwa-Block-6.jpg'),
  [normalizeNameForLookup('Maun Masjid')]: require('../assets/images/Maun-Masjid.jpg'),
  [normalizeNameForLookup('Mochudi Masjid')]: require('../assets/images/Mochudi-Masjid.jpg'),
  [normalizeNameForLookup('Palapye Masjid')]: require('../assets/images/Palapye-Masjid.jpg'),
  [normalizeNameForLookup('Rasesa Masjid')]: require('../assets/images/Rasesa-Masjid.jpg'),
  [normalizeNameForLookup('Selebi Phikwe Masjid')]: require('../assets/images/Selebi-Phikwe-Masjid.jpg'),
  [normalizeNameForLookup('Selebi Phikwe Masjid2')]: require('../assets/images/Selebi-Phikwe-Masjid2.jpg'),
  [normalizeNameForLookup('Serowe Masjid')]: require('../assets/images/Serowe-Masjid.jpg'),
  onboardingbg: require('../assets/images/onboardingBg.png'),
};

export function resolveMasjidImage(key?: string) {
  if (!key) return imagesByKey['onboardingbg'];
  const k = normalizeNameForLookup(String(key));
  return imagesByKey[k] ?? imagesByKey['onboardingbg'];
}