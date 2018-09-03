// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {Entity, EntityNotFoundError, model} from '../../../';

describe('EntityNotFoundError', () => {
  it('inherits from Error correctly', () => {
    const err = givenAnErrorInstance();
    expect(err).to.be.instanceof(EntityNotFoundError);
    expect(err).to.be.instanceof(Error);
    expect(err.stack)
      .to.be.String()
      .and.match((s: string) => s.indexOf(__filename) > -1);
  });

  it('sets code to "ENTITY_NOT_FOUND"', () => {
    const err = givenAnErrorInstance();
    expect(err.code).to.equal('ENTITY_NOT_FOUND');
  });

  it('sets entity name and id properties', () => {
    const err = new EntityNotFoundError('Product', 'an-id');
    expect(err).to.have.properties({
      entityName: 'Product',
      entityId: 'an-id',
    });
  });

  it('has a descriptive error message', () => {
    const err = new EntityNotFoundError('Product', 'an-id');
    expect(err.message).to.match(/not found.*Product.*"an-id"/);
  });

  it('infers entity name from entity class via name', () => {
    class Product extends Entity {}

    const err = new EntityNotFoundError(Product, 1);
    expect(err.entityName).to.equal('Product');
  });

  it('infers entity name from entity class via modelName', () => {
    @model({name: 'CustomProduct'})
    class Product extends Entity {}

    const err = new EntityNotFoundError(Product, 1);
    expect(err.entityName).to.equal('CustomProduct');
  });

  function givenAnErrorInstance() {
    return new EntityNotFoundError('Product', 1);
  }
});
