import '@testing-library/jest-dom';

// Mock CSS modules
jest.mock('*.module.css', () => {
  const mock = {};
  return new Proxy(mock, {
    get: (target, prop) => prop
  });
});
