/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import XLSX, { WorkBook } from 'xlsx';
import lodash from 'lodash';
import { ICollection, ICollectionManager } from '@nocobase/data-source-manager';
import { Transaction } from 'sequelize';

export type ImportColumn = {
  dataIndex: Array<string>;
  defaultTitle: string;
};

type ImporterOptions = {
  collectionManager: ICollectionManager;
  collection: ICollection;
  columns: Array<ImportColumn>;
  workbook: WorkBook;
  chunkSize?: number;
};

type RunOptions = {
  transaction?: Transaction;
};

export class XlsxImporter {
  constructor(private options: ImporterOptions) {
    if (options.columns.length == 0) {
      throw new Error();
    }
  }

  async run(options: RunOptions = {}) {
    let transaction = options.transaction;

    // @ts-ignore
    if (!transaction && this.options.collectionManager.db) {
      // @ts-ignore
      transaction = options.transaction = await this.options.collectionManager.db.sequelize.transaction();
    }

    try {
      await this.performImport(options);

      transaction && (await transaction.commit());
    } catch (error) {
      transaction && (await transaction.rollback());

      throw error;
    }
  }

  async performImport(options?: RunOptions) {
    const transaction = options?.transaction;
    const rows = this.getData();
    const chunks = lodash.chunk(rows, this.options.chunkSize || 200);

    let handingRowIndex = 1;

    for (const chunkRows of chunks) {
      for (const row of chunkRows) {
        const rowValues = {};
        handingRowIndex += 1;
        try {
          for (let index = 0; index < this.options.columns.length; index++) {
            const column = this.options.columns[index];

            const field = this.options.collection.getField(column.dataIndex[0]);

            if (!field) {
              throw new Error(`Field not found: ${column.dataIndex[0]}`);
            }

            const str = row[index];

            const dataKey = column.dataIndex[0];

            const fieldOptions = field.options;
            const interfaceName = fieldOptions.interface;

            const InterfaceClass = this.options.collectionManager.getFieldInterface(interfaceName);

            if (!InterfaceClass) {
              rowValues[dataKey] = str;
              continue;
            }

            const interfaceInstance = new InterfaceClass(field.options);
            const value = interfaceInstance.toValue(str);
            rowValues[dataKey] = value;
          }
          await this.options.collection.repository.create({
            values: rowValues,
            transaction,
          });
        } catch (error) {
          throw new Error(`failed to import row ${handingRowIndex}`, { cause: error });
        }
      }

      // await to prevent high cpu usage
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  getData() {
    const firstSheet = this.firstSheet();
    const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: null, raw: false });

    const headers = rows[0];
    const columns = this.options.columns;

    // validate headers
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (column.defaultTitle !== headers[i]) {
        throw new Error(`Invalid header: ${column.defaultTitle} !== ${headers[i]}`);
      }
    }

    // remove header
    rows.shift();

    return rows;
  }

  firstSheet() {
    return this.options.workbook.Sheets[this.options.workbook.SheetNames[0]];
  }
}
