import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  const service = new UsersService();

  it('returns all users', () => {
    expect(service.findAll()).toHaveLength(3);
  });

  it('returns a single user by id', () => {
    expect(service.findOne(1).name).toBe('Alice Johnson');
  });

  it('throws NotFoundException for an unknown id', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });
});
