import {Model, model, property} from '@loopback/repository';

@model()
export class Certificate extends Model {
  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<Certificate>) {
    super(data);
  }
}

export interface CertificateRelations {
  // describe navigational properties here
}

export type CertificateWithRelations = Certificate & CertificateRelations;
