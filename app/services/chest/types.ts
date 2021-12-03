export interface FoundRecord {
  id: string;
  foundAt: string;
  byId: string;
  byName: string;
}

export interface ChestRemote {
  id: string;
  amount: number;
  message?: {
    markdown: string;
  };
}

export interface FoundRecordRemote {
  id: string;
  chest: ChestRemote;
  foundAt: string;
}
