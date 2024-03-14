import {categoriesTypes} from '../utils/categories';

export interface AudioData {
  id: string;
  title: string;
  category: categoriesTypes;
  about: string;
  file: string;
  poster?: string;
  owner: {
    name: string;
    id: string;
  };
}

export interface Playlist {
  title: string;
  visibility: string;
  id: string;
  itemsCount: number;
  visible: 'public' | 'private';
}
