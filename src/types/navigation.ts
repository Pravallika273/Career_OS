import React from 'react';

export type RouteId =
  | 'home'
  | 'my-plan'
  | 'explore'
  | 'careers'
  | 'learn'
  | 'tasks'
  | 'task-workspace'
  | 'learn-and-do'
  | 'communication'
  | 'work-ready'
  | '/work-ready'
  | 'opportunities'
  | 'applications'
  | 'interview'
  | 'mentors'
  | '/mentors'
  | 'my-career'
  | 'help'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'overview'
  | 'discovery'
  | 'plans'
  | 'skills'
  | 'projects'
  | 'evidence'
  | 'portfolio'
  | 'resume'
  | 'network'
  | 'design-system'
  | 'login'
  | 'signup'
  | 'onboarding'
  | (string & {});

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  id: RouteId;
  label: string;
  description: string;
  icon: string;
  badge?: string;
  isPillar?: boolean;
}
