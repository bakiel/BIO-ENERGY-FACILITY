import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface FinancialMetric {
  label: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface Milestone {
  phase: string;
  duration: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'future';
}

export interface Project {
  id: string;
  name: string;
  location: string;
  shortDesc: string;
  investment: string;
  roi: string;
  jobs: number;
  status: 'Planned' | 'Investment Ready' | 'Active';
  type: string;
  color: string;
}