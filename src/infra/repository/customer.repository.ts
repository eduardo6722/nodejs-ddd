import { Address } from '../../domain/entity/address';
import { Customer } from '../../domain/entity/customer';
import { ICustomerRepository } from '../../domain/repository/customer-repository.interface';
import { CustomerModel } from '../db/sequelize/models/customer.model';

export class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address._street,
      number: entity.address._number,
      zip: entity.address._zip,
      city: entity.address._city,
    });
  }

  async find(id: string): Promise<Customer | null> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id } });
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city,
      );
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.Address = address;
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    } catch {
      return null;
    }
  }

  async findAll(): Promise<Customer[]> {
    const data = await CustomerModel.findAll();
    return data.map((customerModel) => {
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city,
      );
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.Address = address;
      return customer;
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address._street,
        number: entity.address._number,
        zip: entity.address._zip,
        city: entity.address._city,
      },
      {
        where: { id: entity.id },
      },
    );
  }

  async activate(id: string): Promise<void> {
    await CustomerModel.update(
      {
        active: true,
      },
      { where: { id } },
    );
  }

  async deactivate(id: string): Promise<void> {
    await CustomerModel.update(
      {
        active: false,
      },
      { where: { id } },
    );
  }
}
