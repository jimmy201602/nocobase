/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaInitializerItemActionModalType } from '@nocobase/client';
import { useNavigate } from 'react-router-dom';

import { generatePluginTranslationTemplate } from '../../locale';
import { getMobileTabBarItemSchemaFields } from '../MobileTabBar.Item';
import { useMobileTabContext } from '../../mobile-providers';
import { editLinkSchema } from './settings';

export interface GetMobileTabBarItemDataOptions {
  url?: string;
  values: any;
}

export function getMobileTabBarItemData(options: GetMobileTabBarItemDataOptions) {
  const { url, values } = options;
  return {
    url,
    parentId: null,
    options: {
      type: 'void',
      'x-decorator': 'BlockItem',
      'x-toolbar-props': {
        draggable: false,
      },
      'x-settings': 'mobile:tab-bar:link',
      'x-component': 'MobileTabBar.Link',
      'x-component-props': {
        ...values,
      },
    },
  };
}

export const mobileTabBarLinkInitializerItem: SchemaInitializerItemActionModalType = {
  name: 'link',
  type: 'actionModal',
  useComponentProps() {
    const { resource, refresh } = useMobileTabContext();
    const navigate = useNavigate();

    return {
      isItem: true,
      width: '90%',
      title: generatePluginTranslationTemplate('Add Link page'),
      buttonText: generatePluginTranslationTemplate('Link'),
      schema: {
        ...getMobileTabBarItemSchemaFields(),
        link: editLinkSchema(),
      },
      async onSubmit(values) {
        if (!values.title && !values.icon) {
          return;
        }

        const isRelative = !values.link.startsWith('http') && !values.link.startsWith('//');

        // 先创建 tab item
        await resource.create({
          values: getMobileTabBarItemData({ url: isRelative ? values.link : undefined, values }),
        });

        // 刷新 tabs
        await refresh();

        // 再跳转到页面
        if (isRelative) {
          navigate(values.link);
        }
      },
    };
  },
};