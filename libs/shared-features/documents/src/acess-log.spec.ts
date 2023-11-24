import { AccessLog } from './access-log';

test('AccessLog properties are valid', () => {
  const accessLog: AccessLog = {
    userId: 'user123',
    timestamp: new Date(),
    action: 'viewed',
  };

  expect(accessLog.userId).toBe('user123');
  expect(accessLog.timestamp).toBeInstanceOf(Date);
  expect(accessLog.action).toBe('viewed');
});

