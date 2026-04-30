import { type SchemaTypeDefinition } from 'sanity';
import { projectType } from './projectType';
import { seoType } from './seoType';
import { statItemType } from './statItemType';
import { linkItemType } from './linkItemType';
import { mediaAssetType } from './mediaAssetType';
import { techTagType } from './techTagType';
import { profileType } from './profileType';

export const schemaTypes: SchemaTypeDefinition[] = [
  projectType,
  seoType,
  statItemType,
  linkItemType,
  mediaAssetType,
  techTagType,
  profileType,
];