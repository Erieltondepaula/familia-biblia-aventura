import React from 'react';

export type SidebarState = 'expanded' | 'collapsed';

export type SidebarContextType = {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = React.createContext<SidebarContextType | null>(null);

export default SidebarContext;
