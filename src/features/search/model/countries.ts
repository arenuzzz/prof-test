import { createStore } from '@lib/effector';
import countries from '@assets/countries.json';
import { Country } from '../search.types';

export const $countries = createStore<Country[]>(countries as Country[]);
