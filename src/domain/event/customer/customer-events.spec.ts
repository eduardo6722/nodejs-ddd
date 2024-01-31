import { Sequelize } from 'sequelize-typescript';
import { CustomerRepository } from '../../../infra/repository/customer.repository';
import { Address } from '../../entity/address';
import { Customer } from '../../entity/customer';
import { CustomerModel } from '../../../infra/db/sequelize/models/customer.model';

describe('Customer events', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should notify when a customer is created', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(new Address('Street', '123', '12345', 'City'));

    await customerRepository.create(customer);

    expect(spy).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated',
      customer,
    );
    expect(spy).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated',
      customer,
    );
  });

  it('Should notify when the address was updated', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    const customer = new Customer('1', 'John Doe');
    customer.changeAddress(new Address('Street', '123', '12345', 'City'));

    expect(spy).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address}`,
    );
  });
});
