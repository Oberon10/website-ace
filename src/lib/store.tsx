'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shipment, Quotation, ContactInquiry, UserProfile, UserRole, ShipmentStatus } from './types';
import { INITIAL_SHIPMENTS, INITIAL_QUOTES, INITIAL_INQUIRIES, DEMO_USERS } from './mockData';

interface AppContextType {
  // Auth & Roles
  currentUser: UserProfile;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  
  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Shipments (CRUD)
  shipments: Shipment[];
  getShipmentByTracking: (trackingNumber: string) => Shipment | undefined;
  createShipment: (newShipment: Omit<Shipment, 'id' | 'created_at' | 'updated_at' | 'checkpoints'>) => Shipment;
  updateShipmentStatus: (id: string, status: ShipmentStatus, location: string, notes?: string) => void;
  deleteShipment: (id: string) => void;

  // Quotations (CRUD)
  quotations: Quotation[];
  createQuotation: (newQuote: Omit<Quotation, 'id' | 'created_at' | 'status'>) => Quotation;
  updateQuotationStatus: (id: string, status: Quotation['status']) => void;

  // Inquiries
  inquiries: ContactInquiry[];
  createInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => void;

  // Modals & UI Controls
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  trackingModalNumber: string | null;
  openTrackingModal: (trackingNumber: string) => void;
  closeTrackingModal: () => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS.customer);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Domain states
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTES);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(INITIAL_INQUIRIES);

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [trackingModalNumber, setTrackingModalNumber] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const loginAs = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_USERS[role]);
    setIsAuthOpen(false);
  };

  const logout = () => {
    setCurrentRole('customer');
    setCurrentUser(DEMO_USERS.customer);
  };

  const getShipmentByTracking = (trackingNumber: string) => {
    const cleanNumber = trackingNumber.trim().toUpperCase();
    return shipments.find(s => s.tracking_number.toUpperCase() === cleanNumber);
  };

  const createShipment = (data: Omit<Shipment, 'id' | 'created_at' | 'updated_at' | 'checkpoints'>) => {
    const now = new Date().toISOString();
    const newId = `sh_${Date.now()}`;
    const newShipment: Shipment = {
      ...data,
      id: newId,
      created_at: now,
      updated_at: now,
      checkpoints: [
        {
          id: `cp_${Date.now()}`,
          shipment_id: newId,
          status: data.status || 'picked_up',
          title: 'Shipment Order Created & Scheduled for Collection',
          location: data.origin,
          timestamp: new Date().toLocaleString(),
          notes: 'Shipment registered in ACE Logistics Global Hub.',
        },
      ],
    };

    setShipments(prev => [newShipment, ...prev]);
    return newShipment;
  };

  const updateShipmentStatus = (id: string, status: ShipmentStatus, location: string, notes?: string) => {
    const now = new Date().toISOString();
    setShipments(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        const newCheckpoint = {
          id: `cp_${Date.now()}`,
          shipment_id: id,
          status,
          title: `Status update: ${status.replace('_', ' ').toUpperCase()}`,
          location,
          timestamp: new Date().toLocaleString(),
          notes: notes || 'Checkpoint scanned by logistics dispatcher.',
        };
        return {
          ...s,
          status,
          current_location: location,
          updated_at: now,
          checkpoints: [newCheckpoint, ...s.checkpoints],
        };
      })
    );
  };

  const deleteShipment = (id: string) => {
    setShipments(prev => prev.filter(s => s.id !== id));
  };

  const createQuotation = (data: Omit<Quotation, 'id' | 'created_at' | 'status'>) => {
    const newQuote: Quotation = {
      ...data,
      id: `qt_${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    setQuotations(prev => [newQuote, ...prev]);
    return newQuote;
  };

  const updateQuotationStatus = (id: string, status: Quotation['status']) => {
    setQuotations(prev =>
      prev.map(q => (q.id === id ? { ...q, status } : q))
    );
  };

  const createInquiry = (data: Omit<ContactInquiry, 'id' | 'created_at' | 'status'>) => {
    const newInquiry: ContactInquiry = {
      ...data,
      id: `inq_${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString(),
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    setInquiries(prev =>
      prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const openTrackingModal = (trackingNumber: string) => {
    setTrackingModalNumber(trackingNumber.trim().toUpperCase());
  };

  const closeTrackingModal = () => {
    setTrackingModalNumber(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole,
        loginAs,
        logout,
        isDark,
        toggleTheme,
        shipments,
        getShipmentByTracking,
        createShipment,
        updateShipmentStatus,
        deleteShipment,
        quotations,
        createQuotation,
        updateQuotationStatus,
        inquiries,
        createInquiry,
        updateInquiryStatus,
        isBookingOpen,
        setIsBookingOpen,
        isAuthOpen,
        setIsAuthOpen,
        trackingModalNumber,
        openTrackingModal,
        closeTrackingModal,
        isVideoModalOpen,
        setIsVideoModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
