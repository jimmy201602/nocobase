/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defineCollection } from '@nocobase/database';
export default defineCollection({
  name: 'mobile-tabs',
  title: 'mobile-tabs',
  inherit: false,
  hidden: false,
  description: null,
  fields: [
    {
      key: '04sn1oc4h1i',
      name: 'parentId',
      type: 'bigInt',
      interface: 'integer',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      isForeignKey: true,
      uiSchema: {
        type: 'number',
        title: '{{t("Parent ID")}}',
        'x-component': 'InputNumber',
        'x-read-pretty': true,
      },
    },
    {
      key: 'ct97hjdh1sr',
      name: 'parent',
      type: 'belongsTo',
      interface: 'm2o',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      foreignKey: 'parentId',
      treeParent: true,
      onDelete: 'CASCADE',
      uiSchema: {
        title: '{{t("Parent")}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: {
            label: 'id',
            value: 'id',
          },
        },
      },
      target: 'mobile-tabs',
      targetKey: 'id',
    },
    {
      key: 'boofvkhgvy2',
      name: 'children',
      type: 'hasMany',
      interface: 'o2m',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      foreignKey: 'parentId',
      treeChildren: true,
      onDelete: 'CASCADE',
      uiSchema: {
        title: '{{t("Children")}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: true,
          fieldNames: {
            label: 'id',
            value: 'id',
          },
        },
      },
      target: 'mobile-tabs',
      targetKey: 'id',
      sourceKey: 'id',
    },
    {
      key: 'hv8f4hx2vfy',
      name: 'id',
      type: 'bigInt',
      interface: 'integer',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      uiSchema: {
        type: 'number',
        title: '{{t("ID")}}',
        'x-component': 'InputNumber',
        'x-read-pretty': true,
      },
    },
    {
      key: 'auzfl4y3vqs',
      name: 'createdAt',
      type: 'date',
      interface: 'createdAt',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      field: 'createdAt',
      uiSchema: {
        type: 'datetime',
        title: '{{t("Created at")}}',
        'x-component': 'DatePicker',
        'x-component-props': {},
        'x-read-pretty': true,
      },
    },
    {
      key: '863lu8btxli',
      name: 'createdBy',
      type: 'belongsTo',
      interface: 'createdBy',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      target: 'users',
      foreignKey: 'createdById',
      uiSchema: {
        type: 'object',
        title: '{{t("Created by")}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          fieldNames: {
            value: 'id',
            label: 'nickname',
          },
        },
        'x-read-pretty': true,
      },
      targetKey: 'id',
    },
    {
      key: 'pcgey6g53es',
      name: 'updatedAt',
      type: 'date',
      interface: 'updatedAt',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      field: 'updatedAt',
      uiSchema: {
        type: 'string',
        title: '{{t("Last updated at")}}',
        'x-component': 'DatePicker',
        'x-component-props': {},
        'x-read-pretty': true,
      },
    },
    {
      key: '72te4pl5r85',
      name: 'updatedBy',
      type: 'belongsTo',
      interface: 'updatedBy',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      target: 'users',
      foreignKey: 'updatedById',
      uiSchema: {
        type: 'object',
        title: '{{t("Last updated by")}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          fieldNames: {
            value: 'id',
            label: 'nickname',
          },
        },
        'x-read-pretty': true,
      },
      targetKey: 'id',
    },
    {
      key: 'oa55l29eu6o',
      name: 'url',
      type: 'string',
      interface: 'input',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      uiSchema: {
        type: 'string',
        'x-component': 'Input',
        title: 'url',
      },
    },
    {
      key: 'xg07ukwg7ii',
      name: 'options',
      type: 'json',
      interface: 'json',
      description: null,
      collectionName: 'mobile-tabs',
      parentKey: null,
      reverseKey: null,
      defaultValue: null,
      uiSchema: {
        type: 'object',
        'x-component': 'Input.JSON',
        'x-component-props': {
          autoSize: {
            minRows: 5,
          },
        },
        default: null,
        title: 'options',
      },
    },
  ],
  category: [],
  logging: true,
  autoGenId: true,
  createdAt: true,
  createdBy: true,
  updatedAt: true,
  updatedBy: true,
  template: 'tree',
  view: false,
  tree: 'adjacencyList',
  schema: 'public',
  filterTargetKey: 'id',
});