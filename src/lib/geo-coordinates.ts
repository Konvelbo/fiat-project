export interface CountryGeo {
  code: string
  name: string
  lat: number
  lng: number
}

export const WORLD_COUNTRIES: Record<string, CountryGeo> = {
  BF: { code: 'BF', name: 'Burkina Faso (Siège)', lat: 12.3714, lng: -1.5197 },
  CI: { code: 'CI', name: "Côte d'Ivoire (Abidjan)", lat: 5.36, lng: -4.0083 },
  SN: { code: 'SN', name: 'Sénégal (Dakar)', lat: 14.7167, lng: -17.4677 },
  FR: { code: 'FR', name: 'France (Paris)', lat: 48.8566, lng: 2.3522 },
  CA: { code: 'CA', name: 'Canada (Montréal)', lat: 45.5017, lng: -73.5673 },
  US: { code: 'US', name: 'États-Unis', lat: 40.7128, lng: -74.006 },
  ML: { code: 'ML', name: 'Mali (Bamako)', lat: 12.6392, lng: -8.0029 },
  NE: { code: 'NE', name: 'Niger (Niamey)', lat: 13.5116, lng: 2.1254 },
  GH: { code: 'GH', name: 'Ghana (Accra)', lat: 5.6037, lng: -0.187 },
  TG: { code: 'TG', name: 'Togo (Lomé)', lat: 6.1375, lng: 1.2123 },
  BJ: { code: 'BJ', name: 'Bénin (Cotonou)', lat: 6.3703, lng: 2.3912 },
  BE: { code: 'BE', name: 'Belgique (Bruxelles)', lat: 50.8503, lng: 4.3517 },
  CH: { code: 'CH', name: 'Suisse (Genève)', lat: 46.2044, lng: 6.1432 },
  DE: { code: 'DE', name: 'Allemagne (Berlin)', lat: 52.52, lng: 13.405 },
  GB: { code: 'GB', name: 'Royaume-Uni (Londres)', lat: 51.5074, lng: -0.1278 },
  AE: { code: 'AE', name: 'Émirats Arabes Unis (Dubaï)', lat: 25.2048, lng: 55.2708 },
  CN: { code: 'CN', name: 'Chine (Shenzhen)', lat: 22.5431, lng: 114.0579 },
  JP: { code: 'JP', name: 'Japon (Tokyo)', lat: 35.6762, lng: 139.6503 },
  ZA: { code: 'ZA', name: 'Afrique du Sud (Johannesburg)', lat: -26.2041, lng: 28.0473 },
  MA: { code: 'MA', name: 'Maroc (Casablanca)', lat: 33.5731, lng: -7.5898 },
}

export function getCountryData(code: string): CountryGeo {
  const upper = (code || 'BF').toUpperCase()
  return (
    WORLD_COUNTRIES[upper] || {
      code: upper,
      name: upper,
      lat: 12.3714,
      lng: -1.5197,
    }
  )
}
