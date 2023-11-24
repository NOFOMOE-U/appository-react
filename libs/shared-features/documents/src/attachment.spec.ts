
import { Attachment } from '../attachments';
test('Attachment properties are valid', () => {
    const attachment: Attachment = {
      id: 'attachment123',
      fileName: 'example.txt',
      fileSize: 1024,
      uploadedBy: 'uploader123',
      uploadDate: new Date(),
      downloadUrl: 'https://example.com/download/example.txt',
    };
  
    expect(attachment.id).toBe('attachment123');
    expect(attachment.fileName).toBe('example.txt');
    expect(attachment.fileSize).toBe(1024);
    expect(attachment.uploadedBy).toBe('uploader123');
    expect(attachment.uploadDate).toBeInstanceOf(Date);
    expect(attachment.downloadUrl).toBe('https://example.com/download/example.txt');
  });
  