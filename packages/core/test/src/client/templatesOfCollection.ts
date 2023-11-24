import { CollectionSetting } from './e2eUtils';

/**
 * 创建一个名为 general 的 collection，其包含所有类型的字段
 */
export const general: CollectionSetting[] = [
  {
    name: 'general',
    title: 'General',
    fields: [
      {
        name: 'singleLineText',
        interface: 'input',
      },
      {
        name: 'longText',
        interface: 'textarea',
      },
      {
        name: 'phone',
        interface: 'phone',
      },
      {
        name: 'email',
        interface: 'email',
      },
      {
        name: 'url',
        interface: 'url',
      },
      {
        name: 'integer',
        interface: 'integer',
      },
      {
        name: 'number',
        interface: 'number',
      },
      {
        name: 'percent',
        interface: 'percent',
      },
      {
        name: 'password',
        interface: 'password',
      },
      {
        name: 'color',
        interface: 'color',
      },
      {
        name: 'icon',
        interface: 'icon',
      },
      {
        name: 'checkbox',
        interface: 'checkbox',
      },
      {
        name: 'singleSelect',
        interface: 'select',
        uiSchema: {
          enum: [
            {
              value: 'option1',
              label: 'option1',
              color: 'red',
            },
            {
              value: 'option2',
              label: 'option2',
              color: 'magenta',
            },
            {
              value: 'option3',
              label: 'option3',
              color: 'volcano',
            },
          ],
          type: 'string',
          'x-component': 'Select',
          title: 'Single select',
        },
      },
      {
        name: 'multipleSelect',
        interface: 'multipleSelect',
        uiSchema: {
          enum: [
            {
              value: 'optoin1',
              label: 'optoin1',
              color: 'red',
            },
            {
              value: 'optoin2',
              label: 'option2',
              color: 'magenta',
            },
            {
              value: 'opton3',
              label: 'option3',
              color: 'volcano',
            },
          ],
          type: 'array',
          'x-component': 'Select',
          'x-component-props': {
            mode: 'multiple',
          },
          title: 'Multiple select',
        },
        defaultValue: [],
      },
      {
        name: 'radioGroup',
        interface: 'radioGroup',
        uiSchema: {
          enum: [
            {
              value: 'option1',
              label: 'option1',
              color: 'red',
            },
            {
              value: 'option2',
              label: 'option2',
              color: 'magenta',
            },
            {
              value: 'option3',
              label: 'option3',
              color: 'volcano',
            },
          ],
          type: 'string',
          'x-component': 'Radio.Group',
          title: 'Radio group',
        },
      },
      {
        name: 'checkboxGroup',
        interface: 'checkboxGroup',
        uiSchema: {
          enum: [
            {
              value: 'option1',
              label: 'option1',
              color: 'red',
            },
            {
              value: 'option2',
              label: 'option2',
              color: 'magenta',
            },
            {
              value: 'option3',
              label: 'option3',
              color: 'volcano',
            },
          ],
          type: 'string',
          'x-component': 'Checkbox.Group',
          title: 'Checkbox group',
        },
        defaultValue: [],
      },
      {
        name: 'chinaRegion',
        interface: 'chinaRegion',
      },
      {
        name: 'markdown',
        interface: 'markdown',
      },
      {
        name: 'richText',
        interface: 'richText',
      },
      {
        name: 'attachment',
        interface: 'attachment',
      },
      {
        name: 'datetime',
        interface: 'datetime',
      },
      {
        name: 'time',
        interface: 'time',
      },
      {
        name: 'oneToOneBelongsTo',
        interface: 'obo',
        target: 'users',
      },
      {
        name: 'oneToOneHasOne',
        interface: 'oho',
        target: 'users',
      },
      {
        name: 'oneToMany',
        interface: 'o2m',
        target: 'users',
      },
      {
        name: 'manyToOne',
        interface: 'm2o',
        target: 'users',
      },
      {
        name: 'manyToMany',
        interface: 'm2m',
        target: 'users',
      },
      {
        name: 'formula',
        interface: 'formula',
      },
      {
        name: 'sequence',
        interface: 'sequence',
      },
      {
        name: 'JSON',
        interface: 'json',
      },
      {
        name: 'collection',
        interface: 'collection',
      },
    ],
  },
];

/**
 * 创建一个名为 general 的 collection，其包含所有 basic 类型的字段
 */
export const generalWithBasic: CollectionSetting[] = [
  {
    name: 'general',
    title: 'General',
    fields: [
      {
        name: 'singleLineText',
        interface: 'input',
      },
      {
        name: 'longText',
        interface: 'textarea',
      },
      {
        name: 'phone',
        interface: 'phone',
      },
      {
        name: 'email',
        interface: 'email',
      },
      {
        name: 'url',
        interface: 'url',
      },
      {
        name: 'integer',
        interface: 'integer',
      },
      {
        name: 'number',
        interface: 'number',
      },
      {
        name: 'percent',
        interface: 'percent',
      },
      {
        name: 'password',
        interface: 'password',
      },
      {
        name: 'color',
        interface: 'color',
      },
      {
        name: 'icon',
        interface: 'icon',
      },
    ],
  },
];

/**
 * 创建一个名为 general 的 collection，其包含所有 choices 类型的字段
 */
export const generalWithChoices: CollectionSetting[] = [
  {
    name: 'general',
    title: 'General',
    fields: [
      {
        name: 'checkbox',
        interface: 'checkbox',
      },
      {
        name: 'checkboxGroup',
        interface: 'checkboxGroup',
      },
      {
        name: 'chinaRegion',
        interface: 'chinaRegion',
      },
      {
        name: 'multipleSelect',
        interface: 'multipleSelect',
      },
      {
        name: 'radioGroup',
        interface: 'radioGroup',
      },
      {
        name: 'singleSelect',
        interface: 'select',
      },
    ],
  },
];

/**
 * 创建一个名为 general 的 collection，其包含所有 media 类型的字段
 */
export const generalWithMedia: CollectionSetting[] = [
  {
    name: 'general',
    title: 'General',
    fields: [
      {
        name: 'markdown',
        interface: 'markdown',
      },
      {
        name: 'richText',
        interface: 'richText',
      },
      {
        name: 'attachment',
        interface: 'attachment',
      },
    ],
  },
];

/**
 * 创建一个名为 general 的 collection，其包含所有 datetime 类型的字段
 */
export const generalWithDatetime: CollectionSetting[] = [
  {
    name: 'general',
    title: 'General',
    fields: [
      {
        name: 'datetime',
        interface: 'datetime',
      },
      {
        name: 'time',
        interface: 'time',
      },
    ],
  },
];

/**
 * 创建一个名为 general 的 collection，其包含所有 relation 类型的字段
 */
export const generalWithRelation: CollectionSetting[] = [
  {
    name: 'general',
    title: 'General',
    fields: [
      {
        name: 'oneToOneBelongsTo',
        interface: 'obo',
        target: 'users',
      },
      {
        name: 'oneToOneHasOne',
        interface: 'oho',
        target: 'users',
      },
      {
        name: 'oneToMany',
        interface: 'o2m',
        target: 'users',
      },
      {
        name: 'manyToOne',
        interface: 'm2o',
        target: 'users',
      },
      {
        name: 'manyToMany',
        interface: 'm2m',
        target: 'users',
      },
    ],
  },
];

export const generalWithSingleLineText: CollectionSetting[] = [
  {
    name: 'general',
    title: 'General',
    fields: [
      {
        name: 'singleLineText',
        interface: 'input',
      },
    ],
  },
];

/**
 * 1. 创建一个名为 general 的 collection，其包含 m2o / o2m / single select 类型的字段
 */
export const generalWithM2oSingleSelect: CollectionSetting[] = [
  {
    name: 'general',
    title: 'General',
    fields: [
      {
        name: 'f_sx575h93rzc',
        interface: 'integer',
        isForeignKey: true,
        uiSchema: {
          type: 'number',
          title: 'f_sx575h93rzc',
          'x-component': 'InputNumber',
          'x-read-pretty': true,
        },
      },
      {
        name: 'f_t22o7loai3j',
        interface: 'integer',
        isForeignKey: true,
        uiSchema: {
          type: 'number',
          title: 'f_t22o7loai3j',
          'x-component': 'InputNumber',
          'x-read-pretty': true,
        },
      },
      {
        name: 'f_y9xcjaa06sc',
        interface: 'integer',
        isForeignKey: true,
        uiSchema: {
          type: 'number',
          title: 'f_y9xcjaa06sc',
          'x-component': 'InputNumber',
          'x-read-pretty': true,
        },
      },
      {
        name: 'manyToOne',
        interface: 'm2o',
        foreignKey: 'f_t22o7loai3j',
        uiSchema: {
          'x-component': 'AssociationField',
          'x-component-props': {
            multiple: false,
            fieldNames: {
              label: 'id',
              value: 'id',
            },
          },
          title: 'Many to one',
        },
        target: 'users',
        targetKey: 'id',
      },
      {
        name: 'oneToMany',
        interface: 'o2m',
        foreignKey: 'f_d3ilpempiob',
        uiSchema: {
          'x-component': 'AssociationField',
          'x-component-props': {
            multiple: true,
            fieldNames: {
              label: 'id',
              value: 'id',
            },
          },
          title: 'One to many',
        },
        target: 'users',
        targetKey: 'id',
        sourceKey: 'id',
      },
      {
        name: 'singleSelect',
        interface: 'select',
        uiSchema: {
          enum: [
            {
              value: 'option1',
              label: 'option2',
              color: 'red',
            },
            {
              value: 'option2',
              label: 'option2',
              color: 'magenta',
            },
            {
              value: 'option3',
              label: 'option3',
              color: 'volcano',
            },
          ],
          type: 'string',
          'x-component': 'Select',
          title: 'Single select',
        },
      },
    ],
  },
  {
    name: 'targetToGeneral',
    title: 'Target to general',
    fields: [
      {
        name: 'toGeneral',
        interface: 'm2o',
        target: 'general',
      },
    ],
  },
];