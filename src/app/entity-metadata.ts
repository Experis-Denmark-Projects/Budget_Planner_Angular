import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { User } from './models/user.model';

const entityMetadata: EntityMetadataMap = {
  User:{
    selectId: (user:User) => user.id
  }
};

const pluralNames = { 
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
