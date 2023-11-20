// shared/aqua.utils.ts
import jest from 'jest'
import { AquaService } from './aqua.service'

export function initAqua(): AquaService {
  // Implement the logic to initialize AquaService with actual dependencies or configurations
  // For example, you might have some setup related to your application configuration
  return new AquaService()
}

export function createMockAqua(): AquaService {
  // Implement the logic to create a mocked instance of AquaService for testing

  // Type assertion to tell TypeScript that Jest has the expected methods
  const jestWithSpyOn: any = jest

  // For example, you might use a library like Jest to create mocks
  const aquaMock: AquaService = jestWithSpyOn.createMockFromModule('./path-to-aqua-service/aqua.service')

  // Optionally, add specific mock implementations
  jestWithSpyOn(aquaMock, 'receiveMessage').mockImplementation(() => 'Mocked message for testing')

  return aquaMock
}
