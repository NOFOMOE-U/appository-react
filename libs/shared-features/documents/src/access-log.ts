
export interface AccessLog {
    userId: string;
    timestamp: Date;
    action: 'viewed' | 'edited' | 'downloaded';
  }
  