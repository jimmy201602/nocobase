/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import { CompatibleSchemaInitializer } from '../../../../application/schema-initializer/CompatibleSchemaInitializer';
import { useCollection_deprecated } from '../../../../collection-manager/hooks/useCollection_deprecated';

const commonOptions = {
  title: "{{t('Configure actions')}}",
  icon: 'SettingOutlined',
  style: {
    marginLeft: 8,
  },
  items: [
    {
      type: 'item',
      name: 'filter',
      title: "{{t('Filter')}}",
      Component: 'FilterActionInitializer',
      schema: {
        'x-align': 'left',
      },
    },
    {
      type: 'item',
      title: "{{t('Add new')}}",
      name: 'addNew',
      Component: 'CreateActionInitializer',
      schema: {
        'x-align': 'right',
        'x-decorator': 'ACLActionProvider',
        'x-acl-action-props': {
          skipScopeCheck: true,
        },
      },
      useVisible() {
        const collection = useCollection_deprecated();
        return !['view', 'file', 'sql'].includes(collection.template) || collection?.writableView;
      },
    },
    {
      type: 'item',
      title: "{{t('Delete')}}",
      name: 'delete',
      Component: 'BulkDestroyActionInitializer',
      schema: {
        'x-align': 'right',
        'x-decorator': 'ACLActionProvider',
      },
      useVisible() {
        const collection = useCollection_deprecated();
        return !['view', 'sql'].includes(collection.template) || collection?.writableView;
      },
    },
    {
      type: 'item',
      title: "{{t('Refresh')}}",
      name: 'refresh',
      Component: 'RefreshActionInitializer',
      schema: {
        'x-align': 'right',
      },
    },
    {
      name: 'toggle',
      title: "{{t('Expand/Collapse')}}",
      Component: 'ExpandableActionInitializer',
      schema: {
        'x-align': 'right',
      },
      useVisible() {
        const schema = useFieldSchema();
        const collection = useCollection_deprecated();
        const { treeTable } = schema?.parent?.['x-decorator-props'] || {};
        return collection.tree && treeTable;
      },
    },
  ],
};

/**
 * @deprecated
 * use `tableActionInitializers` instead
 * 表格操作配置
 */
export const tableActionInitializers_deprecated = new CompatibleSchemaInitializer({
  name: 'TableActionInitializers',
  ...commonOptions,
});

export const tableActionInitializers = new CompatibleSchemaInitializer(
  {
    name: 'table:configureActions',
    ...commonOptions,
  },
  tableActionInitializers_deprecated,
);
