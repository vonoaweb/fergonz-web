import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { BloodType } from '@/utils/blood';

export interface DonationRecord {
  id: string;
  date: string; // ISO
  center: string;
  requestId?: string;
  note?: string;
}

export interface Appointment {
  id: string;
  centerId: string;
  centerName: string;
  requestId?: string;
  date: string; // ISO
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface DonorProfile {
  name: string;
  bloodType: BloodType | null;
  city: string;
  weightKg: number | null;
  notificationsEnabled: boolean;
}

interface DonorState {
  ready: boolean;
  onboarded: boolean;
  profile: DonorProfile;
  donations: DonationRecord[];
  appointments: Appointment[];
}

interface DonorContextValue extends DonorState {
  completeOnboarding: (profile: Partial<DonorProfile>) => Promise<void>;
  updateProfile: (patch: Partial<DonorProfile>) => Promise<void>;
  addDonation: (record: Omit<DonationRecord, 'id'>) => Promise<void>;
  scheduleAppointment: (appt: Omit<Appointment, 'id' | 'status'>) => Promise<Appointment>;
  cancelAppointment: (id: string) => Promise<void>;
  lastDonationDate: Date | null;
  reset: () => Promise<void>;
}

const STORAGE_KEY = 'vidalink.state.v1';

const defaultState: DonorState = {
  ready: false,
  onboarded: false,
  profile: {
    name: '',
    bloodType: null,
    city: '',
    weightKg: null,
    notificationsEnabled: true,
  },
  donations: [],
  appointments: [],
};

const DonorContext = createContext<DonorContextValue | undefined>(undefined);

const uid = () => Math.random().toString(36).slice(2, 10);

export function DonorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DonorState>(defaultState);

  // Hydrate from storage on mount.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && mounted) {
          const parsed = JSON.parse(raw) as Partial<DonorState>;
          setState((prev) => ({ ...prev, ...parsed, ready: true }));
          return;
        }
      } catch {
        // fall through to default
      }
      if (mounted) setState((prev) => ({ ...prev, ready: true }));
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const persist = useCallback(async (next: DonorState) => {
    const { ready, ...toSave } = next;
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // best effort; app keeps working in-memory
    }
  }, []);

  const mutate = useCallback(
    async (updater: (prev: DonorState) => DonorState) => {
      let computed: DonorState = state;
      setState((prev) => {
        computed = updater(prev);
        return computed;
      });
      await persist(computed);
    },
    [persist, state],
  );

  const completeOnboarding = useCallback(
    async (profile: Partial<DonorProfile>) => {
      await mutate((prev) => ({
        ...prev,
        onboarded: true,
        profile: { ...prev.profile, ...profile },
      }));
    },
    [mutate],
  );

  const updateProfile = useCallback(
    async (patch: Partial<DonorProfile>) => {
      await mutate((prev) => ({
        ...prev,
        profile: { ...prev.profile, ...patch },
      }));
    },
    [mutate],
  );

  const addDonation = useCallback(
    async (record: Omit<DonationRecord, 'id'>) => {
      await mutate((prev) => ({
        ...prev,
        donations: [{ ...record, id: uid() }, ...prev.donations],
      }));
    },
    [mutate],
  );

  const scheduleAppointment = useCallback(
    async (appt: Omit<Appointment, 'id' | 'status'>) => {
      const created: Appointment = { ...appt, id: uid(), status: 'scheduled' };
      await mutate((prev) => ({
        ...prev,
        appointments: [created, ...prev.appointments],
      }));
      return created;
    },
    [mutate],
  );

  const cancelAppointment = useCallback(
    async (id: string) => {
      await mutate((prev) => ({
        ...prev,
        appointments: prev.appointments.map((a) =>
          a.id === id ? { ...a, status: 'cancelled' } : a,
        ),
      }));
    },
    [mutate],
  );

  const reset = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setState({ ...defaultState, ready: true });
  }, []);

  const lastDonationDate = useMemo(() => {
    if (state.donations.length === 0) return null;
    const sorted = [...state.donations].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return new Date(sorted[0].date);
  }, [state.donations]);

  const value = useMemo<DonorContextValue>(
    () => ({
      ...state,
      completeOnboarding,
      updateProfile,
      addDonation,
      scheduleAppointment,
      cancelAppointment,
      lastDonationDate,
      reset,
    }),
    [
      state,
      completeOnboarding,
      updateProfile,
      addDonation,
      scheduleAppointment,
      cancelAppointment,
      lastDonationDate,
      reset,
    ],
  );

  return <DonorContext.Provider value={value}>{children}</DonorContext.Provider>;
}

export function useDonor(): DonorContextValue {
  const ctx = useContext(DonorContext);
  if (!ctx) throw new Error('useDonor must be used within a DonorProvider');
  return ctx;
}
