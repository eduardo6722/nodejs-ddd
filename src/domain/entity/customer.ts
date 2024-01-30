import { Address } from './address';

export class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = false;
  _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
  }

  activate() {
    if (!this._address) {
      throw new Error('Address is required');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  isActive() {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get address() {
    return this._address;
  }
}
