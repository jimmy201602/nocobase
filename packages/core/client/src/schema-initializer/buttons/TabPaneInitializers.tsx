/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useForm } from '@formily/react';
import React, { useMemo } from 'react';
import { SchemaComponent, useActionContext, useDesignable, useRecord } from '../..';
import { SchemaInitializer } from '../../application/schema-initializer/SchemaInitializer';
import { useGetAriaLabelOfSchemaInitializer } from '../hooks/useGetAriaLabelOfSchemaInitializer';

const TabPaneInitializers = (props?: any) => {
  const { designable, insertBeforeEnd } = useDesignable();
  const { isCreate, isBulkEdit, options } = props;
  const { gridInitializer } = options;
  const { getAriaLabel } = useGetAriaLabelOfSchemaInitializer();
  const record = useRecord();

  const useSubmitAction = () => {
    const form = useForm();
    const ctx = useActionContext();
    let initializer = gridInitializer;
    if (!initializer) {
      initializer = 'popup:common:addBlock';
      if (isCreate || !record) {
        initializer = 'popup:addNew:addBlock';
      } else if (isBulkEdit) {
        initializer = 'popup:bulkEdit:addBlock';
      }
    }
    return {
      async run() {
        await form.submit();
        const { title, icon } = form.values;
        insertBeforeEnd({
          type: 'void',
          title,
          'x-component': 'Tabs.TabPane',
          'x-designer': 'Tabs.Designer',
          'x-component-props': {
            icon,
          },
          properties: {
            grid: {
              type: 'void',
              'x-component': 'Grid',
              'x-initializer': initializer,
              properties: {},
            },
          },
        });
        await form.reset();
        ctx.setVisible(false);
      },
    };
  };
  const schema = useMemo(() => {
    return {
      type: 'void',
      properties: {
        action1: {
          type: 'void',
          'x-component': 'Action',
          'x-component-props': {
            icon: 'PlusOutlined',
            style: {
              borderColor: 'var(--colorSettings)',
              color: 'var(--colorSettings)',
            },
            type: 'dashed',
            'aria-label': getAriaLabel(),
          },
          title: '{{t("Add tab")}}',
          properties: {
            drawer1: {
              'x-decorator': 'Form',
              'x-component': 'Action.Modal',
              'x-component-props': {
                width: 520,
                zIndex: 2000,
              },
              type: 'void',
              title: '{{t("Add tab")}}',
              properties: {
                title: {
                  title: '{{t("Tab name")}}',
                  required: true,
                  'x-component': 'Input',
                  'x-decorator': 'FormItem',
                },
                icon: {
                  title: '{{t("Icon")}}',
                  'x-component': 'IconPicker',
                  'x-decorator': 'FormItem',
                },
                footer: {
                  'x-component': 'Action.Modal.Footer',
                  type: 'void',
                  properties: {
                    cancel: {
                      title: '{{t("Cancel")}}',
                      'x-component': 'Action',
                      'x-component-props': {
                        useAction: () => {
                          const ctx = useActionContext();
                          return {
                            async run() {
                              ctx.setVisible(false);
                            },
                          };
                        },
                      },
                    },
                    submit: {
                      title: '{{t("Submit")}}',
                      'x-component': 'Action',
                      'x-component-props': {
                        type: 'primary',
                        useAction: useSubmitAction,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
  }, []);

  if (!designable) {
    return null;
  }

  return <SchemaComponent schema={schema} />;
};

const TabPaneInitializersForCreateFormBlock = (props) => {
  return <TabPaneInitializers {...props} isCreate />;
};

const TabPaneInitializersForBulkEditFormBlock = (props) => {
  return <TabPaneInitializers {...props} isBulkEdit />;
};

const commonOptions = {
  Component: TabPaneInitializers,
  popover: false,
};

/**
 * @deprecated
 * use `tabPaneInitializers` instead
 */
export const tabPaneInitializers_deprecated = new SchemaInitializer({
  name: 'TabPaneInitializers',
  ...commonOptions,
});

export const tabPaneInitializers = new SchemaInitializer({
  name: 'popup:addTab',
  ...commonOptions,
});

/**
 * @deprecated
 * use `tabPaneInitializers` instead
 */
export const tabPaneInitializersForRecordBlock = new SchemaInitializer({
  name: 'TabPaneInitializersForCreateFormBlock',
  Component: TabPaneInitializersForCreateFormBlock,
  popover: false,
});

/**
 * @deprecated
 * use `tabPaneInitializers` instead
 */
export const tabPaneInitializersForBulkEditFormBlock = new SchemaInitializer({
  name: 'TabPaneInitializersForBulkEditFormBlock',
  Component: TabPaneInitializersForBulkEditFormBlock,
  popover: false,
});
