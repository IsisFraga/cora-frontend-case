import { ReactNode } from 'react';
import { act } from '@testing-library/react';

export const createWrapperFor = () => {
  const wrapper = ({ children }: { children: ReactNode }) => children;
  return wrapper;
};

export const clearAllMocks = (): void => {
  localStorage.clear();
  jest.clearAllMocks();
};

export const actSafe = async (callback: () => Promise<void> | void): Promise<void> => {
  await act(async () => {
    await callback();
  });
};