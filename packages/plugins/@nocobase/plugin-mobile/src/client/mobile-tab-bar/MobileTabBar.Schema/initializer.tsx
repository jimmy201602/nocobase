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
import { uid } from '@formily/shared';

import { generatePluginTranslationTemplate } from '../../locale';
import { getMobileTabBarItemSchemaFields } from '../MobileTabBar.Item';
import { useMobileTabContext } from '../../mobile-providers';

export interface GetMobileTabBarItemDataOptions {
  pageSchemaUid: string;
  url?: string;
  values: any;
}

export function getMobileTabBarItemData(options: GetMobileTabBarItemDataOptions) {
  const { pageSchemaUid, url, values } = options;
  return {
    url,
    parentId: null,
    options: {
      type: 'void',
      'x-decorator': 'BlockItem',
      'x-toolbar-props': {
        draggable: false,
      },
      'x-settings': 'mobile:tab-bar:schema',
      'x-component': 'MobileTabBar.Schema',
      'x-component-props': {
        ...values,
        pageSchemaUid: pageSchemaUid,
      },
    },
  };
}

export interface GetMobileTabBarItemTabDataOptions {
  tabSchemaUid: string;
  pageUrl?: string;
  parentId: number;
  title?: string;
}

export function getMobileTabBarItemTabData(options: GetMobileTabBarItemTabDataOptions) {
  const { tabSchemaUid, pageUrl, parentId, title } = options;
  return {
    url: `${pageUrl}/tabs/${tabSchemaUid}`,
    parentId,
    options: {
      title: title || 'Unnamed',
      tabSchemaUid,
    },
  };
}

export function getPageContentSchema(pageSchemaUid: string) {
  return {
    type: 'void',
    'x-uid': pageSchemaUid,
    'x-async': true, // 异步
    'x-component': 'Grid',
    'x-initializer': 'mobile:addBlock',
  };
}

function getPageSchema(pageSchemaUId: string, firstTabSchemaUid: string) {
  const pageSchema = {
    type: 'void',
    name: pageSchemaUId,
    'x-uid': pageSchemaUId,
    'x-component': 'MobilePage',
    'x-settings': 'mobile:page',
    'x-decorator': 'BlockItem',
    'x-toolbar-props': {
      draggable: false,
    },
    properties: {
      [uid()]: {
        type: 'void',
        'x-component': 'MobileNavigationBar',
        properties: {
          leftActions: {
            type: 'void',
            'x-component': 'ActionBar',
            'x-initializer': 'mobile:navigation-bar',
          },
          rightActions: {
            type: 'void',
            'x-component': 'ActionBar',
            'x-initializer': 'mobile:navigation-bar',
          },
        },
      },
      [uid()]: {
        type: 'void',
        'x-component': 'MobileContent',
        properties: {
          [firstTabSchemaUid]: getPageContentSchema(firstTabSchemaUid),
        },
      },
    },
  };

  return { schema: pageSchema };
}

export const mobileTabBarSchemaInitializerItem: SchemaInitializerItemActionModalType = {
  name: 'schema',
  type: 'actionModal',
  useComponentProps() {
    const { resource, refresh, schemaResource } = useMobileTabContext();
    const navigate = useNavigate();
    return {
      isItem: true,
      width: '90%',
      title: generatePluginTranslationTemplate('Add page'),
      buttonText: generatePluginTranslationTemplate('Page'),
      schema: getMobileTabBarItemSchemaFields(),
      async onSubmit(values) {
        if (!values.title && !values.icon) {
          return;
        }

        const pageSchemaUId = uid();
        const firstTabSchemaUid = uid();
        const url = `/schema/${pageSchemaUId}`;

        // 先创建 TabBar item
        const { data } = await resource.create({
          values: getMobileTabBarItemData({ url, pageSchemaUid: pageSchemaUId, values }),
        });

        // 创建空页面
        await schemaResource.insertAdjacent({
          resourceIndex: 'mobile',
          position: 'beforeEnd',
          values: getPageSchema(pageSchemaUId, firstTabSchemaUid),
        });

        // 创建 TabBar item 的第一个 tab
        const parentId = data.data.id;
        await resource.create({
          values: getMobileTabBarItemTabData({ pageUrl: url, tabSchemaUid: firstTabSchemaUid, parentId }),
        });

        // 刷新 tabs
        await refresh();

        // 再跳转到页面
        navigate(url);
      },
    };
  },
};