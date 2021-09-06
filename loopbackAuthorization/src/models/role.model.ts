import {Entity, model, property} from '@loopback/repository';

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  rid: number;

  @property({
    type: 'string',
    required: true,
  })
  rname: string;

  @property({
    type: 'string',
    required: true,
  })
  key: String;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
