// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { DataSource } from 'typeorm';

export class CustomTypeORMAdapter {
  dataSource: DataSource;

  constructor(connection: DataSource) {
    this.dataSource = connection;
  }

  build(modelClass, props) {
    const model = new modelClass();
    for (const [key, value] of Object.entries(props)) {
      model[key] = value;
    }
    return model;
  }

  async save(model) {
    return this.dataSource.manager.save(model);
  }

  async destroy(model, modelClass) {
    const manager = this.dataSource.manager;
    const modelRepo = manager.getRepository(modelClass);
    const theModel = await modelRepo.findOne(model.id);
    if (theModel) {
      return manager.transaction(async (tm) => {
        await tm.query('SET FOREIGN_KEY_CHECKS=0;');
        await tm.delete(modelClass, model.id);
        return tm.query('SET FOREIGN_KEY_CHECKS=1;');
      });
    } else {
      return;
    }
  }

  get(model, attr) {
    return model[attr];
  }

  set(props, model) {
    Object.keys(props).forEach((key) => {
      model[key] = props[key];
    });
    return model;
  }
}
