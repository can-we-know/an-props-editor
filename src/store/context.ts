import { createContext } from 'react';
import Store from './index';

const StoreContext = createContext<Store>(null as any);

export default StoreContext;
