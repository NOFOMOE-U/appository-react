
export interface Attachment {
    id: string;
    fileName: string;
    fileSize: number; // in bytes
    uploadedBy: string; // User ID or username who uploaded the attachment
    uploadDate: Date;
    downloadUrl: string;
  }