/**
 * Datos reales para México (fuentes oficiales, consultadas jul 2026):
 * - Centros: Cruz Roja Mexicana, CNTS (Secretaría de Salud), IMSS CMN Siglo XXI, INCMNSZ.
 * - Requisitos y frecuencia: CNTS, IMSS, ISSSTE.
 * Las solicitudes de pacientes NO se incluyen aquí: solo deben provenir de
 * instituciones verificadas a través de un backend con validación.
 */

export interface DonationCenter {
  id: string;
  name: string;
  type: string;
  alcaldia: string;
  address: string;
  hours: string;
  phone: string;
  site: string;
  acceptsWalkIns: boolean;
  note: string;
}

export const CENTERS: DonationCenter[] = [
  {
    id: 'c1',
    name: 'Cruz Roja Mexicana · Banco de Sangre',
    type: 'Organización humanitaria',
    alcaldia: 'Miguel Hidalgo, CDMX',
    address: 'Av. Ejército Nacional Mexicano 1032, Polanco, C.P. 11510',
    hours: 'Lun a Vie · 8:00–14:00',
    phone: '55 5395 5433',
    site: 'donacionsangrecruzrojamexicana.org.mx',
    acceptsWalkIns: true,
    note: 'Puedes agendar tu cita en línea desde su sitio oficial.',
  },
  {
    id: 'c2',
    name: 'CNTS · Centro Nacional de la Transfusión Sanguínea',
    type: 'Autoridad nacional (Secretaría de Salud)',
    alcaldia: 'Gustavo A. Madero, CDMX',
    address: 'Av. Othón de Mendizábal 195, Col. Zacatenco, C.P. 07360',
    hours: 'Consulta horario por teléfono',
    phone: '55 3922 2500',
    site: 'gob.mx/cnts',
    acceptsWalkIns: true,
    note: 'Coordina la donación a nivel nacional y recibe donadores.',
  },
  {
    id: 'c3',
    name: 'Banco Central de Sangre · CMN Siglo XXI (IMSS)',
    type: 'IMSS · Hospital de Especialidades',
    alcaldia: 'Cuauhtémoc, CDMX',
    address: 'Av. Cuauhtémoc 330, Col. Doctores, C.P. 06720',
    hours: 'Consulta horario del banco de sangre',
    phone: '55 5627 6900',
    site: 'imss.gob.mx',
    acceptsWalkIns: true,
    note: 'Uno de los bancos de sangre más grandes del país.',
  },
  {
    id: 'c4',
    name: 'Banco de Sangre · INCMNSZ (Nutrición)',
    type: 'Instituto Nacional de Salud',
    alcaldia: 'Tlalpan, CDMX',
    address: 'Vasco de Quiroga 15, Belisario Domínguez Secc. XVI, C.P. 14080',
    hours: 'Consulta horario por teléfono',
    phone: '55 5487 0900',
    site: 'incmnsz.mx',
    acceptsWalkIns: false,
    note: 'Recibe donadores para los pacientes del instituto.',
  },
];

export interface Requisito {
  icon: string;
  title: string;
  body: string;
}

/** Requisitos oficiales para donar en México (CNTS / IMSS / ISSSTE). */
export const REQUISITOS: Requisito[] = [
  { icon: 'person-outline', title: 'Edad', body: 'Tener entre 18 y 65 años.' },
  { icon: 'barbell-outline', title: 'Peso', body: 'Pesar más de 50 kg.' },
  {
    icon: 'restaurant-outline',
    title: 'Ayuno',
    body: 'Ayuno de 4 a 12 h. Evita alimentos grasosos 24 h antes; puedes tomar agua, jugos o fruta.',
  },
  { icon: 'moon-outline', title: 'Descanso', body: 'Haber dormido al menos 6 horas.' },
  {
    icon: 'wine-outline',
    title: 'Sin alcohol',
    body: 'No haber ingerido bebidas alcohólicas en las últimas 48 h.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Buena salud',
    body: 'No haber padecido hepatitis, VIH/sida, sífilis, paludismo, cáncer o cardiopatías severas.',
  },
  {
    icon: 'bandage-outline',
    title: 'Sin procedimientos recientes',
    body: 'Sin cirugías en 6 meses; sin tatuajes, perforaciones o acupuntura en el último año.',
  },
  {
    icon: 'card-outline',
    title: 'Identificación',
    body: 'Presenta una identificación oficial vigente con fotografía.',
  },
];

/** Frecuencia de donación en México. */
export const FRECUENCIA: [string, string][] = [
  ['Sangre completa', 'Cada 2 meses (mín. 56 días)'],
  ['Máximo al año', 'Hombres 4 veces · Mujeres 3 veces'],
  ['Plaquetas (aféresis)', 'Cada 2 semanas'],
  ['Dobles glóbulos rojos', 'Cada 6 meses'],
];

export interface Tip {
  id: string;
  icon: string;
  title: string;
  body: string;
}

export const PRE_TIPS: Tip[] = [
  {
    id: 't1',
    icon: 'water-outline',
    title: 'Hidrátate bien',
    body: 'Bebe agua extra las 24 horas previas. Facilita la extracción.',
  },
  {
    id: 't2',
    icon: 'restaurant-outline',
    title: 'Come ligero',
    body: 'Desayuna sin grasas. Evita ir en ayuno prolongado.',
  },
  {
    id: 't3',
    icon: 'bed-outline',
    title: 'Duerme 6 h+',
    body: 'Descansa bien la noche anterior para llegar en tu mejor forma.',
  },
  {
    id: 't4',
    icon: 'card-outline',
    title: 'Lleva identificación',
    body: 'Un documento oficial con foto agiliza tu registro.',
  },
];

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  threshold: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', icon: 'sparkles-outline', title: 'Primera gota', description: 'Registra tu primera donación.', threshold: 1 },
  { id: 'a2', icon: 'heart-outline', title: 'Héroe anónimo', description: 'Alcanza 3 donaciones altruistas.', threshold: 3 },
  { id: 'a3', icon: 'ribbon-outline', title: 'Guardián de vidas', description: 'Llega a 5 donaciones.', threshold: 5 },
  { id: 'a4', icon: 'trophy-outline', title: 'Leyenda vital', description: 'Dona 10 veces o más.', threshold: 10 },
];

export const FAQ = [
  {
    q: '¿Duele donar sangre?',
    a: 'Solo sientes un pequeño piquete al inicio. La extracción dura entre 8 y 12 minutos.',
  },
  {
    q: '¿Cada cuánto puedo donar?',
    a: 'Sangre completa cada 2 meses. Los hombres pueden donar hasta 4 veces al año y las mujeres hasta 3.',
  },
  {
    q: '¿A cuántas personas ayuda una donación?',
    a: 'Una sola donación puede ayudar hasta a 3 personas, porque se separa en glóbulos rojos, plasma y plaquetas.',
  },
  {
    q: '¿La donación es gratuita?',
    a: 'Sí. La donación altruista es voluntaria y no se paga ni se cobra. Vender sangre está prohibido.',
  },
  {
    q: '¿Necesito cita?',
    a: 'Depende del centro. La Cruz Roja permite agendar en línea; otros bancos reciben donadores directamente. Confirma por teléfono.',
  },
];

/** Casos reales de pacientes solo desde plataformas/instituciones verificadas. */
export const REAL_CASES_URL = 'https://blooders.org';
