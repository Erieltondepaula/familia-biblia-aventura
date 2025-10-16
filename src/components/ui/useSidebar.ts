import React from 'react';
import SidebarContextDef from './sidebarContextDef';

export const useSidebar = () => {
  const context = React.useContext(SidebarContextDef);
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider.');
  return context;
};

export default useSidebar;
