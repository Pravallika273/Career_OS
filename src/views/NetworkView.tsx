import React from 'react';
import { RouteId } from '../types/navigation';
import { MentorsView } from './MentorsView';

export interface NetworkViewProps {
  onNavigate: (route: RouteId) => void;
  onActionClick?: () => void;
}

export const NetworkView: React.FC<NetworkViewProps> = ({
  onNavigate,
}) => {
  return <MentorsView onNavigate={onNavigate} />;
};
