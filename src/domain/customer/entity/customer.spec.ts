import { Address } from '../value-object/address';
import { Customer } from './customer';

describe('Customer', () => {
  it('Should throw an error when is empty', () => {
    expect(() => new Customer('', 'John')).toThrow('Id is required');
  });

  it('Should throw an error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrow('Name is required');
  });

  it('Should update the name', () => {
    const customer = new Customer('1', 'John');
    customer.changeName('Jane');
    expect(customer._name).toBe('Jane');
  });

  it('Should throw an error when changeName receives empty name', () => {
    const customer = new Customer('1', 'John');
    expect(() => customer.changeName('')).toThrow('Name is required');
  });

  it('Should activate customer', () => {
    const customer = new Customer('1', 'John');
    const address = new Address('Cool Avenue', '123', '12345', 'Rio');
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('Should deactivate customer', () => {
    const customer = new Customer('1', 'John');
    const address = new Address('Cool Avenue', '123', '12345', 'Rio');
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('Should not change status active when there is no address', () => {
    const customer = new Customer('1', 'John');
    expect(() => customer.activate()).toThrow('Address is required');
  });

  it('Should add reward points', () => {
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
