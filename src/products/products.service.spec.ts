import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
  const service = new ProductsService();

  it('returns all products', () => {
    expect(service.findAll()).toHaveLength(3);
  });

  it('returns a single product by id', () => {
    expect(service.findOne(2).name).toBe('Keyboard');
  });

  it('throws NotFoundException for an unknown id', () => {
    expect(() => service.findOne(42)).toThrow(NotFoundException);
  });
});
