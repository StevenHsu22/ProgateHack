import { atomWithReset } from 'jotai/utils';

import { dialogInterface } from '@/types/dialogInterface';

export const dialogState = atomWithReset<dialogInterface | null>(null);
