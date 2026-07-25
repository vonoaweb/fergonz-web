import { BloodType } from '@/utils/blood';

export type Urgency = 'critical' | 'high' | 'normal';

export interface BloodRequest {
  id: string;
  patientAlias: string;
  bloodType: BloodType;
  urgency: Urgency;
  hospital: string;
  city: string;
  distanceKm: number;
  unitsNeeded: number;
  unitsFulfilled: number;
  reason: string;
  postedHoursAgo: number;
  contactName: string;
}

export const REQUESTS: BloodRequest[] = [
  {
    id: 'r1',
    patientAlias: 'Bebé Mateo, 4 meses',
    bloodType: 'O-',
    urgency: 'critical',
    hospital: 'Hospital Infantil de la Ciudad',
    city: 'Zona Centro',
    distanceKm: 2.4,
    unitsNeeded: 6,
    unitsFulfilled: 2,
    reason: 'Cirugía cardíaca programada mañana. Reserva crítica de sangre O negativo.',
    postedHoursAgo: 1,
    contactName: 'Banco de Sangre · Dra. Rivas',
  },
  {
    id: 'r2',
    patientAlias: 'Sofía, 28 años',
    bloodType: 'A+',
    urgency: 'high',
    hospital: 'Clínica Santa María',
    city: 'Colonia Norte',
    distanceKm: 5.1,
    unitsNeeded: 4,
    unitsFulfilled: 1,
    reason: 'Complicación posparto con pérdida de sangre. Necesita transfusión.',
    postedHoursAgo: 3,
    contactName: 'Enfermería · Piso 4',
  },
  {
    id: 'r3',
    patientAlias: 'Don Ernesto, 61 años',
    bloodType: 'B+',
    urgency: 'high',
    hospital: 'Hospital General Regional',
    city: 'Zona Sur',
    distanceKm: 8.7,
    unitsNeeded: 3,
    unitsFulfilled: 3,
    reason: 'Tratamiento de leucemia, requiere transfusiones semanales de plaquetas.',
    postedHoursAgo: 6,
    contactName: 'Oncología · Trabajo Social',
  },
  {
    id: 'r4',
    patientAlias: 'Accidentado vial',
    bloodType: 'O+',
    urgency: 'critical',
    hospital: 'Cruz Roja · Unidad de Trauma',
    city: 'Av. Reforma',
    distanceKm: 3.9,
    unitsNeeded: 8,
    unitsFulfilled: 5,
    reason: 'Politraumatismo por accidente de tránsito. Reponiendo reservas de urgencias.',
    postedHoursAgo: 2,
    contactName: 'Urgencias · Coordinación',
  },
  {
    id: 'r5',
    patientAlias: 'Valeria, 34 años',
    bloodType: 'AB-',
    urgency: 'normal',
    hospital: 'Instituto de Maternidad',
    city: 'Colonia Jardines',
    distanceKm: 11.2,
    unitsNeeded: 2,
    unitsFulfilled: 0,
    reason: 'Cesárea programada. Tipo poco común, se busca reserva preventiva.',
    postedHoursAgo: 12,
    contactName: 'Ginecología',
  },
  {
    id: 'r6',
    patientAlias: 'Campaña abierta',
    bloodType: 'A-',
    urgency: 'normal',
    hospital: 'Banco de Sangre Municipal',
    city: 'Centro Cívico',
    distanceKm: 4.5,
    unitsNeeded: 20,
    unitsFulfilled: 8,
    reason: 'Jornada mensual para mantener reservas de la red hospitalaria.',
    postedHoursAgo: 20,
    contactName: 'Coordinación de Donación',
  },
];

export interface DonationCenter {
  id: string;
  name: string;
  type: string;
  address: string;
  distanceKm: number;
  hoursToday: string;
  openNow: boolean;
  rating: number;
  waitMinutes: number;
  phone: string;
  acceptsWalkIns: boolean;
}

export const CENTERS: DonationCenter[] = [
  {
    id: 'c1',
    name: 'Banco de Sangre Central',
    type: 'Banco de sangre público',
    address: 'Av. de la Salud 145, Zona Centro',
    distanceKm: 1.8,
    hoursToday: '07:00 – 19:00',
    openNow: true,
    rating: 4.8,
    waitMinutes: 15,
    phone: '+52 000 000 0001',
    acceptsWalkIns: true,
  },
  {
    id: 'c2',
    name: 'Cruz Roja · Centro de Donación',
    type: 'Organización humanitaria',
    address: 'Calle Solidaridad 22, Av. Reforma',
    distanceKm: 3.6,
    hoursToday: '08:00 – 20:00',
    openNow: true,
    rating: 4.9,
    waitMinutes: 25,
    phone: '+52 000 000 0002',
    acceptsWalkIns: true,
  },
  {
    id: 'c3',
    name: 'Hospital Universitario · Hemocentro',
    type: 'Hospital escuela',
    address: 'Circuito Universitario s/n, Zona Sur',
    distanceKm: 6.2,
    hoursToday: 'Cerrado (abre 8:00)',
    openNow: false,
    rating: 4.6,
    waitMinutes: 10,
    phone: '+52 000 000 0003',
    acceptsWalkIns: false,
  },
  {
    id: 'c4',
    name: 'Unidad Móvil · Plaza Mayor',
    type: 'Colecta itinerante',
    address: 'Plaza Mayor, frente al kiosco',
    distanceKm: 2.9,
    hoursToday: '09:00 – 15:00',
    openNow: true,
    rating: 4.7,
    waitMinutes: 5,
    phone: '+52 000 000 0004',
    acceptsWalkIns: true,
  },
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
    body: 'Bebe agua extra las 24 horas previas. Un cuerpo hidratado facilita la extracción.',
  },
  {
    id: 't2',
    icon: 'restaurant-outline',
    title: 'Come antes de donar',
    body: 'Un desayuno o comida rica en hierro (sin grasas pesadas) evita el mareo.',
  },
  {
    id: 't3',
    icon: 'bed-outline',
    title: 'Duerme suficiente',
    body: 'Descansa al menos 6 horas la noche anterior para llegar en tu mejor forma.',
  },
  {
    id: 't4',
    icon: 'card-outline',
    title: 'Lleva identificación',
    body: 'Un documento oficial con foto agiliza tu registro en el centro.',
  },
];

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  threshold: number; // donations needed
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    icon: 'sparkles-outline',
    title: 'Primera gota',
    description: 'Completa tu primera donación.',
    threshold: 1,
  },
  {
    id: 'a2',
    icon: 'heart-outline',
    title: 'Héroe anónimo',
    description: 'Alcanza 3 donaciones altruistas.',
    threshold: 3,
  },
  {
    id: 'a3',
    icon: 'ribbon-outline',
    title: 'Guardián de vidas',
    description: 'Llega a 5 donaciones.',
    threshold: 5,
  },
  {
    id: 'a4',
    icon: 'trophy-outline',
    title: 'Leyenda vital',
    description: 'Dona 10 veces o más.',
    threshold: 10,
  },
];

export const FAQ = [
  {
    q: '¿Duele donar sangre?',
    a: 'Solo sientes un pequeño piquete al inicio. Todo el proceso dura entre 8 y 12 minutos.',
  },
  {
    q: '¿Cada cuánto puedo donar?',
    a: 'La sangre completa puede donarse cada 56 días (unas 8 semanas). Tu cuerpo repone el plasma en 24-48 h.',
  },
  {
    q: '¿Quién puede donar?',
    a: 'En general personas de 18 a 65 años, con más de 50 kg, buena salud y sin ayuno. Cada centro confirma requisitos.',
  },
  {
    q: '¿La donación es realmente gratuita?',
    a: 'Sí. La donación altruista no se paga ni se cobra: es un acto voluntario para quien lo necesite.',
  },
];
