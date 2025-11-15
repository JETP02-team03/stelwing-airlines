'use client';

import { ReactNode } from 'react';
import { TripProvider } from '../../src/context/TripContext';

export default function TravelPlannerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <TripProvider>{children}</TripProvider>;
}
