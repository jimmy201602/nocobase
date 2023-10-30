import Icon, { TableOutlined } from '@ant-design/icons';
import { Divider, Empty, Input, Menu, MenuProps, Spin } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSchemaInitializer, useSchemaInitializerMenuItems } from '../../application';
import { useCompile } from '../../schema-component';
import { useSchemaTemplateManager } from '../../schema-templates';
import { useCollectionDataSourceItemsV2 } from '../utils';
import { useTranslation } from 'react-i18next';

const MENU_ITEM_HEIGHT = 40;
const STEP = 15;

export const SearchCollections = ({ value: outValue, onChange }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>(outValue);
  const inputRef = React.useRef<any>(null);

  // 之所以要增加个内部的 value 是为了防止用户输入过快时造成卡顿的问题
  useEffect(() => {
    setValue(outValue);
  }, [outValue]);

  // TODO: antd 的 Input 的 autoFocus 有 BUG，会不生效，等待官方修复后再简化：https://github.com/ant-design/ant-design/issues/41239
  useEffect(() => {
    // 1. 组件在第一次渲染时自动 focus，提高用户体验
    inputRef.current.input.focus();

    // 2. 当组件已经渲染，并再次显示时，自动 focus
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        inputRef.current.input.focus();
      }
    });

    observer.observe(inputRef.current.input);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ width: 210 }} onClick={(e) => e.stopPropagation()}>
      <Input
        ref={inputRef}
        allowClear
        style={{ padding: '0 4px 6px' }}
        bordered={false}
        placeholder={t('Search and select collection')}
        value={value}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          onChange(e.target.value);
          setValue(e.target.value);
        }}
      />
      <Divider style={{ margin: 0 }} />
    </div>
  );
};

const LoadingItem = ({ loadMore, maxHeight }) => {
  const spinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spinRef.current;
    if (!el) return;

    let container = el.parentElement;
    while (container && container.tagName !== 'UL') {
      container = container.parentElement;
    }

    const checkLoadMore = function () {
      if (!container) return;
      // 判断滚动是否到达底部
      if (container.scrollHeight - container.scrollTop === container.clientHeight) {
        // 到达底部，执行加载更多的操作
        loadMore();
      }
    };

    // 监听滚动，滚动到底部触发加载更多
    if (container) {
      container.addEventListener('scroll', checkLoadMore);
      container.style.maxHeight = `${maxHeight}px`;
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkLoadMore);
        delete container.style.maxHeight;
      }
    };
  }, [loadMore, maxHeight]);

  return (
    <div ref={spinRef} onClick={(e) => e.stopPropagation()}>
      <Spin size="small" style={{ width: '100%' }} />
    </div>
  );
};

function useSearch(items: any[], isOpenSubMenu: boolean) {
  const [searchValue, setSearchValue] = useState('');
  const [count, setCount] = useState(STEP);

  useEffect(() => {
    if (isOpenSubMenu) {
      setSearchValue('');
    }
  }, [isOpenSubMenu]);

  // 根据搜索的值进行处理
  const searchedItems = useMemo(() => {
    if (!searchValue) return items;
    const lowerSearchValue = searchValue.toLocaleLowerCase();
    return items.filter((item) => item?.label && String(item.label).toLocaleLowerCase().includes(lowerSearchValue));
  }, [searchValue, items]);

  const shouldLoadMore = useMemo(() => searchedItems.length > count, [count, searchedItems]);

  // 根据 count 进行懒加载处理
  const limitedSearchedItems = useMemo(() => {
    return searchedItems.slice(0, count);
  }, [searchedItems, count]);

  // 最终的返回结果
  const resultItems = useMemo<MenuProps['items']>(() => {
    const res: MenuProps['items'] = [
      // 开头：搜索框
      {
        key: 'search-items',
        label: (
          <SearchCollections
            value={searchValue}
            onChange={(val: string) => {
              setCount(STEP);
              setSearchValue(val);
            }}
          />
        ),
        onClick({ domEvent }) {
          domEvent.stopPropagation();
        },
      },
    ];

    // 中间：搜索的数据
    if (limitedSearchedItems.length > 0) {
      // 有搜索结果
      res.push(...limitedSearchedItems);

      if (shouldLoadMore) {
        res.push({
          key: 'loading-more',
          label: (
            <LoadingItem
              maxHeight={STEP * MENU_ITEM_HEIGHT}
              loadMore={() => {
                setCount((count) => count + STEP);
              }}
            />
          ),
        });
      }
    } else {
      // 搜索结果为空
      res.push({
        key: 'empty',
        style: {
          height: 150,
        },
        label: (
          <div onClick={(e) => e.stopPropagation()}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        ),
      });
    }

    return res;
  }, [limitedSearchedItems, searchValue, shouldLoadMore]);

  return resultItems;
}

export const DataBlockInitializer = (props) => {
  const {
    templateWrap,
    onCreateBlockSchema,
    componentType,
    createBlockSchema,
    isCusomeizeCreate,
    icon = TableOutlined,
    name,
    title,
    items,
  } = props;
  const { insert } = useSchemaInitializer();
  const compile = useCompile();
  const { getTemplateSchemaByMode } = useSchemaTemplateManager();
  const onClick = useCallback(
    async ({ item }) => {
      if (item.template) {
        const s = await getTemplateSchemaByMode(item);
        templateWrap ? insert(templateWrap(s, { item })) : insert(s);
      } else {
        if (onCreateBlockSchema) {
          onCreateBlockSchema({ item });
        } else if (createBlockSchema) {
          insert(createBlockSchema({ collection: item.name, isCusomeizeCreate }));
        }
      }
    },
    [createBlockSchema, getTemplateSchemaByMode, insert, isCusomeizeCreate, onCreateBlockSchema, templateWrap],
  );
  const defaultItems = useCollectionDataSourceItemsV2(componentType);
  const menuChildren = useMemo(() => items || defaultItems, [items, defaultItems]);
  const childItems = useSchemaInitializerMenuItems(menuChildren, name, onClick);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const searchedChildren = useSearch(childItems, isOpenSubMenu);
  const compiledMenuItems = useMemo(
    () => [
      {
        key: name,
        label: compile(title),
        icon: typeof icon === 'string' ? <Icon type={icon as string} /> : icon,
        onClick: (info) => {
          if (info.key !== name) return;
          onClick({ ...info, item: props });
        },
        children: searchedChildren,
      },
    ],
    [name, compile, title, icon, searchedChildren, onClick, props],
  );
  return (
    <Menu
      onOpenChange={(keys) => {
        setIsOpenSubMenu(keys.length > 0);
      }}
      items={compiledMenuItems}
    />
  );
};
