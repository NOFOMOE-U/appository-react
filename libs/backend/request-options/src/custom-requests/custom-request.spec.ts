// import { Test } from '@nestjs/testing';
// import { Request } from 'express';
// import { CustomRequest } from './custom-request.interface';
// describe('CustomRequest', () => {
//   let customRequest: CustomRequest;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       providers: [],
//     }).compile();

//     const request = {
//       get: jest.fn(),
//       header: jest.fn(),
//       params: {},
//       query: {},
//     } as unknown as Request;

//     customRequest = Object.assign(new CustomRequest(), request);
//   });

//   describe('get', () => {
//     it('should call the get method of the underlying request object', () => {
//       const spy = jest.spyOn(customRequest, 'get');
//       customRequest.get('some-header');
//       expect(spy).toHaveBeenCalled();
//     });
//   });

//   describe('header', () => {
//     it('should call the header method of the underlying request object', () => {
//       const spy = jest.spyOn(customRequest, 'header');
//       customRequest.header('some-header');
//       expect(spy).toHaveBeenCalled();
//     });
//   });
// });
