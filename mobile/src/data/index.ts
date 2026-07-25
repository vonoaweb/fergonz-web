/**
 * Datos reales para Jalisco (fuentes oficiales, consultadas jul 2026):
 * - Centros: CETS Jalisco (SSJ), Hospital Civil de Guadalajara, IMSS CMN de Occidente.
 * - Requisitos y frecuencia: CETS Jalisco, Hospital Civil, IMSS.
 * Las solicitudes de pacientes NO se incluyen aquí: solo deben provenir de
 * instituciones verificadas a través de un backend con validación.
 */

export interface DonationCenter {
  id: string;
  name: string;
  type: string;
  alcaldia: string; // municipio / zona
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
    name: 'CETS Jalisco · Centro Estatal de la Transfusión Sanguínea',
    type: 'Secretaría de Salud Jalisco',
    alcaldia: 'Zapopan, Jal.',
    address: 'Av. Zoquipan 1050, Col. Seattle, C.P. 45170',
    hours: 'Lun a Vie · 9:00–15:00',
    phone: '33 3636 7667',
    site: 'cetsjalisco.org',
    acceptsWalkIns: true,
    note: 'Centro estatal líder en calidad. Puedes agendar cita en línea.',
  },
  {
    id: 'c2',
    name: 'Banco de Sangre · Antiguo Hospital Civil "Fray Antonio Alcalde"',
    type: 'Hospital Civil de Guadalajara',
    alcaldia: 'Guadalajara Centro, Jal.',
    address: 'Calle Hospital 278, Col. El Retiro, C.P. 44280',
    hours: 'Lun a Vie · por la mañana',
    phone: '33 3942 4400',
    site: 'cbs.hcg.gob.mx',
    acceptsWalkIns: true,
    note: 'Atiende al hospital escuela más grande de Occidente.',
  },
  {
    id: 'c3',
    name: 'Banco de Sangre · IMSS CMN de Occidente',
    type: 'IMSS · UMAE de Especialidades',
    alcaldia: 'Guadalajara (Independencia), Jal.',
    address: 'Belisario Domínguez 1000, Col. Independencia, C.P. 44340',
    hours: 'Lun a Vie · 9:00–17:00 · Sáb/Dom por la mañana',
    phone: '33 3617 2207',
    site: 'bancodesangre.imss.gob.mx',
    acceptsWalkIns: true,
    note: 'Recibe donadores para derechohabientes y familiares.',
  },
  {
    id: 'c4',
    name: 'Banco de Sangre · Nuevo Hospital Civil "Dr. Juan I. Menchaca"',
    type: 'Hospital Civil de Guadalajara',
    alcaldia: 'Guadalajara (Independencia Ote.), Jal.',
    address: 'Salvador Quevedo y Zubieta 750, Independencia Oriente, C.P. 44340',
    hours: 'Lun a Vie · por la mañana',
    phone: '33 3942 4400',
    site: 'hcg.gob.mx',
    acceptsWalkIns: true,
    note: 'Segundo banco de sangre de los Hospitales Civiles de Guadalajara.',
  },
];

export interface Requisito {
  icon: string;
  title: string;
  body: string;
}

/** Requisitos oficiales para donar en Jalisco (CETS Jalisco / Hospital Civil / IMSS). */
export const REQUISITOS: Requisito[] = [
  { icon: 'person-outline', title: 'Edad', body: 'Tener entre 18 y 65 años.' },
  { icon: 'barbell-outline', title: 'Peso', body: 'Pesar más de 50 kg.' },
  {
    icon: 'restaurant-outline',
    title: 'Ayuno moderado',
    body: 'Acude con 4 h de ayuno. Tu última comida ligera, con líquidos; evita grasas y lácteos.',
  },
  { icon: 'water-outline', title: 'Hidrátate', body: 'Toma suficiente agua antes de acudir.' },
  { icon: 'moon-outline', title: 'Descanso', body: 'Duerme bien la noche anterior.' },
  {
    icon: 'shield-checkmark-outline',
    title: 'Sin prácticas de riesgo',
    body: 'Sin riesgo de hepatitis o VIH; no estar tomando medicamentos.',
  },
  {
    icon: 'shirt-outline',
    title: 'Ropa cómoda',
    body: 'Usa ropa cómoda de manga corta para facilitar la extracción.',
  },
  {
    icon: 'card-outline',
    title: 'Identificación',
    body: 'Lleva identificación oficial con fotografía reciente.',
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
    a: 'El CETS Jalisco permite agendar en línea; varios bancos reciben donadores directamente. Confirma por teléfono.',
  },
];

/** Casos reales de pacientes solo desde plataformas/instituciones verificadas. */
export const REAL_CASES_URL = 'https://blooders.org';
