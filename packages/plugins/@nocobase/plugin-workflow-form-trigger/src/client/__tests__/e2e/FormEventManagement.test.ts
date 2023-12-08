import { expect, test } from '@nocobase/test/client';
import { dayjs } from '@nocobase/utils';
import { faker } from '@faker-js/faker';
import { e2e_GeneralFormsTable, appendJsonCollectionName } from '@nocobase/plugin-workflow-test';
import { CreateWorkFlow, EditWorkFlow, CollectionTriggerNode, FromEventTriggerNode } from '@nocobase/plugin-workflow-test';
import { WorkflowManagement, WorkflowListRecords, ScheduleTriggerNode } from '@nocobase/plugin-workflow-test';

test.describe('filter workflow', () => {
    test('filter workflow name', async ({ page }) => {
        //用例标题
        const caseTitle = 'filter workflow name';

        // 1、前置条件：1.1、已登录,1.2、存在一个工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await page.getByLabel('action-Action-Add new-workflows').click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByRole('option', { name: 'Form event' }).click();
        await page.getByLabel('action-Action-Submit-workflows').click();

        await expect(page.getByText(workFlowName)).toBeAttached();

        // 2、测试步骤：进入“工作流管理”-“筛选”按钮，筛选工作流名称
        await page.getByLabel('action-Filter.Action-Filter-filter-workflows').click();
        await page.getByRole('textbox').fill(workFlowName);
        await page.getByRole('button', { name: 'Submit' }).click();

        // 3、预期结果：列表中出现筛选的工作流
        await expect(page.getByText(workFlowName)).toBeAttached();

        // 4、后置处理：删除工作流
        await page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}`).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });
});

test.describe('add new workflow', () => {
    test('add new Form event', async ({ page }) => {
        //用例标题
        const caseTitle = 'add new Form event';

        // 1、前置条件：已登录

        // 2、测试步骤：进入“工作流管理”-“新建”按钮，填写表单，点击“确定”按钮
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await page.getByLabel('action-Action-Add new-workflows').click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByRole('option', { name: 'Form event' }).click();
        await page.getByLabel('action-Action-Submit-workflows').click();

        // 3、预期结果：新建成功，列表中出现新建的工作流
        await expect(page.getByText(workFlowName)).toBeVisible();

        // 4、后置处理：删除新建的工作流
        await page.getByLabel('action-Filter.Action-Filter-filter-workflows').click();
        await page.getByRole('textbox').fill(workFlowName);
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}`).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });
});

test.describe('sync workflow', () => { });

test.describe('delete workflow', () => {
    test('delete Form event', async ({ page }) => {
        //用例标题
        const caseTitle = 'delete Form event';

        // 1、前置条件：1.1、已登录,1.2、存在一个工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await page.getByLabel('action-Action-Add new-workflows').click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByRole('option', { name: 'Form event' }).click();
        await page.getByLabel('action-Action-Submit-workflows').click();

        await expect(page.getByText(workFlowName)).toBeAttached();

        // 2、测试步骤：进入“工作流管理”-“删除”操作，删除工作流名称
        await page.getByLabel('action-Filter.Action-Filter-filter-workflows').click();
        await page.getByRole('textbox').fill(workFlowName);
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}`).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();

        // 4、后置处理：删除工作流
    });
});

test.describe('edit workflow', () => {
    test('edit Form event name', async ({ page }) => {
        //用例标题
        const caseTitle = 'edit Form event name';

        // 1、前置条件：1.1、已登录,1.2、存在一个工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await page.getByLabel('action-Action-Add new-workflows').click();
        const createWorkFlow = new CreateWorkFlow(page);
        let workFlowName = caseTitle + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByRole('option', { name: 'Form event' }).click();
        await page.getByLabel('action-Action-Submit-workflows').click();

        await expect(page.getByText(workFlowName)).toBeAttached();

        // 2、测试步骤：进入“工作流管理”-“编辑”按钮，编辑名称，点击“确定”按钮
        await page.getByLabel(`action-Action.Link-Edit-workflows-${workFlowName}`).click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        workFlowName = caseTitle + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await createWorkFlow.name.fill(workFlowName);
        await page.getByLabel('action-Action-Submit-workflows').click();

        // 3、预期结果：编辑成功，列表中出现编辑后的工作流
        await expect(page.getByText(workFlowName)).toBeAttached();

        // 4、后置处理：删除工作流
        await page.getByLabel('action-Filter.Action-Filter-filter-workflows').click();
        await page.getByRole('textbox').fill(workFlowName);
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}`).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });
});

test.describe('copy workflow', () => {
    test('Copy Form events that do not set any node information', async ({ page }) => {
        //用例标题
        const caseTitle = 'Copy Form events that do not set any node information';

        // 1、前置条件：1.1、已登录,1.2、存在一个工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await page.getByLabel('action-Action-Add new-workflows').click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByRole('option', { name: 'Form event' }).click();
        await page.getByLabel('action-Action-Submit-workflows').click();

        await expect(page.getByText(workFlowName)).toBeAttached();

        // 2、测试步骤：进入“工作流管理”-“复制”操作
        await page.getByLabel(`action-Action.Link-Duplicate-workflows-${workFlowName}`).click();
        await page.getByLabel(`action-Action-Submit-workflows-${workFlowName}`).click();

        // 3、预期结果：列表中出现筛选的工作流
        await expect(page.getByText(`${workFlowName} copy`)).toBeAttached();

        // 4、后置处理：删除工作流
        await page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}  copy`).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(`${workFlowName} copy`)).toBeHidden();

        await page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}`).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });
});

test.describe('View Execution History', () => { });

test.describe('trigger node configure', () => {
    test('Form Submit Button Binding Workflow Add Data Trigger', async ({ page, mockPage }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Form Submit Button Binding Workflow Add Data Trigger';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的表单事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();
        // await page.getByLabel(`action-WorkflowLink-Configure-workflows-${workFlowName}`).click();
        const fromEventTriggerNode = new FromEventTriggerNode(page, workFlowName, collectionName);
        await fromEventTriggerNode.nodeConfigure.click();
        // await page.getByRole('button', { name: 'Configure' }).click();
        await fromEventTriggerNode.collectionDropDown.click();
        // await page.getByTestId('select-collection').getByLabel('Search').click();
        await page.getByText(collectionDisplayName).click();
        await fromEventTriggerNode.submitButton.click();
        // await page.getByLabel('action-Action-Submit-workflows').click();
        await page.getByRole('link', { name: 'Workflow' }).click();
        await workflowListRecords.editAction.click();
        // await page.getByLabel(`action-Action.Link-Edit-workflows-${workFlowName}`).click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        await editWorkFlow.statusIsOn.check();
        // await page.getByLabel('On', { exact: true }).check();
        await editWorkFlow.submitButton.click();
        // await page.getByLabel('action-Action-Submit-workflows').click();

        //配置录入数据区块
        await newPage.goto();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('schema-initializer-Grid-BlockInitializers').hover();
        await page.getByRole('menuitem', { name: 'table Table' }).hover();
        await page.getByLabel(`dataBlocks-table-${collectionDisplayName}`).click();
        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByText('Configure columns').hover();
        await page.getByText(fieldDisplayName).click();
        await page.getByText('Configure actions').hover();
        await page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch').click();
        await expect(page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch')).toBeEnabled();

        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        await page.getByLabel(`schema-initializer-Grid-CreateFormBlockInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'form Form' }).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-Grid-FormItemInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: `Display collection fields-${fieldDisplayName}` }).click();
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-ActionBar-CreateFormActionInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'Submit' }).click();
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`).hover();
        await page
            .getByRole('button', { name: `designer-schema-settings-Action-Action.Designer-${collectionName}` })
            .hover();
        await page.getByLabel('Bind workflows').click();
        await page.getByRole('button', { name: 'plus Add workflow' }).click();
        await page.getByTestId('select-single').getByLabel('Search').click();
        await page.getByText(workFlowName).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();

        // 2、测试步骤：进入“数据区块”-“添加”按钮，填写表单，点击“确定”按钮
        const fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();

        // 3、预期结果：数据添加成功，工作流成功触发
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');
        // await expect(page.getByRole('table').locator('a').filter({ hasText: '1' })).toBeVisible();

        // 4、后置处理：删除工作流
        await workflowListRecords.deleteAction.click();
        // await page.getByLabel(`action-Action.Link-Delete-workflows-${workFlowName}`).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });

    test('Form Submit to Workflow Button Add Data Trigger', async ({ page, mockPage }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Form Submit to Workflow Button Add Data Trigger';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的表单事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();
        const fromEventTriggerNode = new FromEventTriggerNode(page, workFlowName, collectionName);
        await fromEventTriggerNode.nodeConfigure.click();
        await fromEventTriggerNode.collectionDropDown.click();
        await page.getByText(collectionDisplayName).click();
        await fromEventTriggerNode.submitButton.click();
        await page.getByRole('link', { name: 'Workflow' }).click();
        await workflowListRecords.editAction.click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        await editWorkFlow.statusIsOn.check();
        await editWorkFlow.submitButton.click();

        //配置录入数据区块
        await newPage.goto();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('schema-initializer-Grid-BlockInitializers').hover();
        await page.getByRole('menuitem', { name: 'table Table' }).hover();
        await page.getByLabel(`dataBlocks-table-${collectionDisplayName}`).click();
        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByText('Configure columns').hover();
        await page.getByText(fieldDisplayName).click();
        await page.getByText('Configure actions').hover();
        await page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch').click();
        await expect(page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch')).toBeEnabled();

        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        await page.getByLabel(`schema-initializer-Grid-CreateFormBlockInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'form Form' }).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-Grid-FormItemInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: `Display collection fields-${fieldDisplayName}` }).click();
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-ActionBar-CreateFormActionInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: 'Customize', exact: true }).hover();
        await page.getByLabel('Customize-Submit to workflow').click();
        await page.getByLabel(`action-Action-Submit to workflow-customize:triggerWorkflows-${collectionName}-form`).hover();
        await page
            .getByTestId(`drawer-Action.Container-${collectionName}-Add record`)
            .getByLabel(`designer-schema-settings-Action-Action.Designer-${collectionName}`)
            .hover();
        await page.getByLabel('Bind workflows').click();
        await page.getByRole('button', { name: 'plus Add workflow' }).click();
        await page.getByTestId('select-single').getByLabel('Search').click();
        await page.getByText(workFlowName).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();

        // 2、测试步骤：进入“数据区块”-“添加”按钮，填写表单，点击“确定”按钮
        const fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit to workflow-customize:triggerWorkflows-${collectionName}-form`).click();

        // 3、预期结果：数据未添加到数据表，工作流成功触发
        await expect(page.getByText(fieldData)).toBeHidden();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');

        // 4、后置处理：删除工作流
        await workflowListRecords.deleteAction.click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });
});

test.describe('Workflow path jumping', () => {
    test('Form Event Workflow Configuration Page Path Jump Workflow Management Page', async ({ page, mockPage }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Form Event Workflow Configuration Page Path Jump Workflow Management Page';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的表单事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        // const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();

        // 2、测试步骤：跳转到工作流管理页面
        await page.getByRole('link', { name: 'Workflow' }).click();

        // 3、预期结果：跳转路径正确
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(`${process.env.APP_BASE_URL}/admin/settings/workflow`);

        // 4、后置处理：删除工作流
        await workflowListRecords.deleteAction.click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });

    test('Form Event Workflow History Version Configuration Page Path Jump Workflow Management Page', async ({
        page,
        mockPage,
    }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Form Event Workflow History Version Configuration Page Path Jump Workflow Management Page';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的表单事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();
        const fromEventTriggerNode = new FromEventTriggerNode(page, workFlowName, collectionName);
        await fromEventTriggerNode.nodeConfigure.click();
        await fromEventTriggerNode.collectionDropDown.click();
        await page.getByText(collectionDisplayName).click();
        await fromEventTriggerNode.submitButton.click();
        await page.getByRole('link', { name: 'Workflow' }).click();
        await workflowListRecords.editAction.click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        await editWorkFlow.statusIsOn.check();
        await editWorkFlow.submitButton.click();

        //配置录入数据区块
        await newPage.goto();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('schema-initializer-Grid-BlockInitializers').hover();
        await page.getByRole('menuitem', { name: 'table Table' }).hover();
        await page.getByLabel(`dataBlocks-table-${collectionDisplayName}`).click();
        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByText('Configure columns').hover();
        await page.getByText(fieldDisplayName).click();
        await page.getByText('Configure actions').hover();
        await page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch').click();
        await expect(page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch')).toBeEnabled();

        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        await page.getByLabel(`schema-initializer-Grid-CreateFormBlockInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'form Form' }).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-Grid-FormItemInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: `Display collection fields-${fieldDisplayName}` }).click();
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-ActionBar-CreateFormActionInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'Submit' }).click();
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`).hover();
        await page
            .getByRole('button', { name: `designer-schema-settings-Action-Action.Designer-${collectionName}` })
            .hover();
        await page.getByLabel('Bind workflows').click();
        await page.getByRole('button', { name: 'plus Add workflow' }).click();
        await page.getByTestId('select-single').getByLabel('Search').click();
        await page.getByText(workFlowName).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();

        // 2、测试步骤：进入“数据区块”页面，添加一条数据,再进入工作流配置界面，复制到新版本
        const fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');

        await workflowListRecords.configureAction.click();
        await page.getByLabel('more').click();
        await page.getByLabel('revision').click();
        await page.waitForLoadState('networkidle');
        //元素重复
        await page.getByLabel('version', { exact: true }).click();
        await page.getByLabel('version-1').click();

        await page.getByRole('link', { name: 'Workflow' }).click();

        // 3、预期结果：跳转路径正确
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(`${process.env.APP_BASE_URL}/admin/settings/workflow`);

        // 4、后置处理：删除工作流
        await workflowListRecords.deleteAction.click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });

    test('Form Event Workflow Execution Log Page Path Jump Workflow Management Page', async ({ page, mockPage }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Form Event Workflow Execution Log Page Path Jump Workflow Management Page';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的表单事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();
        const fromEventTriggerNode = new FromEventTriggerNode(page, workFlowName, collectionName);
        await fromEventTriggerNode.nodeConfigure.click();
        await fromEventTriggerNode.collectionDropDown.click();
        await page.getByText(collectionDisplayName).click();
        await fromEventTriggerNode.submitButton.click();
        await page.getByRole('link', { name: 'Workflow' }).click();
        await workflowListRecords.editAction.click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        await editWorkFlow.statusIsOn.check();
        await editWorkFlow.submitButton.click();

        //配置录入数据区块
        await newPage.goto();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('schema-initializer-Grid-BlockInitializers').hover();
        await page.getByRole('menuitem', { name: 'table Table' }).hover();
        await page.getByLabel(`dataBlocks-table-${collectionDisplayName}`).click();
        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByText('Configure columns').hover();
        await page.getByText(fieldDisplayName).click();
        await page.getByText('Configure actions').hover();
        await page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch').click();
        await expect(page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch')).toBeEnabled();

        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        await page.getByLabel(`schema-initializer-Grid-CreateFormBlockInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'form Form' }).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-Grid-FormItemInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: `Display collection fields-${fieldDisplayName}` }).click();
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-ActionBar-CreateFormActionInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'Submit' }).click();
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`).hover();
        await page
            .getByRole('button', { name: `designer-schema-settings-Action-Action.Designer-${collectionName}` })
            .hover();
        await page.getByLabel('Bind workflows').click();
        await page.getByRole('button', { name: 'plus Add workflow' }).click();
        await page.getByTestId('select-single').getByLabel('Search').click();
        await page.getByText(workFlowName).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();

        // 2、测试步骤：进入“数据区块”页面，添加一条数据,再进入工作流执行日志界面，返回工作流管理界面
        const fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');
        await workflowListRecords.executionCountPopup.click();
        await page.getByText('View').click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('link', { name: 'Workflow', exact: true }).click();

        // 3、预期结果：跳转路径正确
        await page.waitForLoadState('networkidle');
        expect(page.url()).toBe(`${process.env.APP_BASE_URL}/admin/settings/workflow`);

        // 4、后置处理：删除工作流
        await workflowListRecords.deleteAction.click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });

    test.skip('Form Event Workflow Execution Log Page Path Jump Execution Log Screen', async ({ page, mockPage }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Form Event Workflow Execution Log Page Path Jump Execution Log Screen';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的表单事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();
        const fromEventTriggerNode = new FromEventTriggerNode(page, workFlowName, collectionName);
        await fromEventTriggerNode.nodeConfigure.click();
        await fromEventTriggerNode.collectionDropDown.click();
        await page.getByText(collectionDisplayName).click();
        await fromEventTriggerNode.submitButton.click();
        await page.getByRole('link', { name: 'Workflow' }).click();
        await workflowListRecords.editAction.click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        await editWorkFlow.statusIsOn.check();
        await editWorkFlow.submitButton.click();

        //配置录入数据区块
        await newPage.goto();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('schema-initializer-Grid-BlockInitializers').hover();
        await page.getByRole('menuitem', { name: 'table Table' }).hover();
        await page.getByLabel(`dataBlocks-table-${collectionDisplayName}`).click();
        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByText('Configure columns').hover();
        await page.getByText(fieldDisplayName).click();
        await page.getByText('Configure actions').hover();
        await page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch').click();
        await expect(page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch')).toBeEnabled();

        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        await page.getByLabel(`schema-initializer-Grid-CreateFormBlockInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'form Form' }).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-Grid-FormItemInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: `Display collection fields-${fieldDisplayName}` }).click();
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-ActionBar-CreateFormActionInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'Submit' }).click();
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`).hover();
        await page
            .getByRole('button', { name: `designer-schema-settings-Action-Action.Designer-${collectionName}` })
            .hover();
        await page.getByLabel('Bind workflows').click();
        await page.getByRole('button', { name: 'plus Add workflow' }).click();
        await page.getByTestId('select-single').getByLabel('Search').click();
        await page.getByText(workFlowName).click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();

        // 2、测试步骤：进入“数据区块”页面，添加一条数据,再进入工作流执行日志界面，返回工作流管理界面
        const fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');
        await workflowListRecords.executionCountPopup.click();
        await page.getByText('View').click();
        await page.waitForLoadState('networkidle');
        //跳转其他执行日志界面，元素无法定位

        // 3、预期结果：跳转路径正确
        await page.waitForLoadState('networkidle');
        // expect(page.url()).toBe(`${process.env.APP_BASE_URL}/admin/settings/workflow`);

        // 4、后置处理：删除工作流
        await workflowListRecords.deleteAction.click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });
});

test.describe('Workflow Switching Versions', () => { });

test.describe('Workflow Enable Disable', () => {
    test('Form event Workflow Add Data Trigger Disable Do Not Trigger', async ({ page, mockPage }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Form event Workflow Add Data Trigger Disable Do Not Trigger';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的数据表事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();
        const collectionTriggerNode = new CollectionTriggerNode(page, workFlowName, collectionName);
        await collectionTriggerNode.nodeConfigure.click();
        await collectionTriggerNode.collectionDropDown.click();
        await page.getByText(collectionDisplayName).click();
        await collectionTriggerNode.triggerOnDropdown.click();
        await page.getByText('After record added', { exact: true }).click();
        await collectionTriggerNode.submitButton.click();
        await page.getByRole('link', { name: 'Workflow' }).click();
        await workflowListRecords.editAction.click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        await editWorkFlow.statusIsOn.check();
        await editWorkFlow.submitButton.click();

        //配置录入数据区块
        await newPage.goto();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('schema-initializer-Grid-BlockInitializers').hover();
        await page.getByRole('menuitem', { name: 'table Table' }).hover();
        await page.getByLabel(`dataBlocks-table-${collectionDisplayName}`).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByText('Configure columns').hover();
        await page.getByText(fieldDisplayName).click();
        await page.getByText('Configure actions').hover();
        await page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch').click();
        await expect(page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch')).toBeEnabled();

        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        await page.getByLabel(`schema-initializer-Grid-CreateFormBlockInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'form Form' }).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-ActionBar-CreateFormActionInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'Submit' }).click();
        await page.getByLabel(`schema-initializer-Grid-FormItemInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: `Display collection fields-${fieldDisplayName}` }).click();

        await page.mouse.move(300, 0);

        // 2、测试步骤：数据区块添加数据触发工作流，禁用工作流，添加数据不触发工作流
        let fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');
        await workflowListRecords.configureAction.click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('switch', { name: 'On Off' }).click();
        // await expect(page.getByRole('switch', { name: 'On Off' })).toBeDisabled();
        await newPage.goto();
        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        // 3、预期结果：触发次数为1
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');

        // 4、后置处理：删除工作流
        await workflowListRecords.deleteAction.click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });

    test('Form event Workflow Add Data Trigger Disable Enable Post Trigger', async ({ page, mockPage }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Form event Workflow Add Data Trigger Disable Enable Post Trigger';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的数据表事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();
        const collectionTriggerNode = new CollectionTriggerNode(page, workFlowName, collectionName);
        await collectionTriggerNode.nodeConfigure.click();
        await collectionTriggerNode.collectionDropDown.click();
        await page.getByText(collectionDisplayName).click();
        await collectionTriggerNode.triggerOnDropdown.click();
        await page.getByText('After record added', { exact: true }).click();
        await collectionTriggerNode.submitButton.click();
        await page.getByRole('link', { name: 'Workflow' }).click();
        await workflowListRecords.editAction.click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        await editWorkFlow.statusIsOn.check();
        await editWorkFlow.submitButton.click();

        //配置录入数据区块
        await newPage.goto();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('schema-initializer-Grid-BlockInitializers').hover();
        await page.getByRole('menuitem', { name: 'table Table' }).hover();
        await page.getByLabel(`dataBlocks-table-${collectionDisplayName}`).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByText('Configure columns').hover();
        await page.getByText(fieldDisplayName).click();
        await page.getByText('Configure actions').hover();
        await page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch').click();
        await expect(page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch')).toBeEnabled();

        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        await page.getByLabel(`schema-initializer-Grid-CreateFormBlockInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'form Form' }).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-ActionBar-CreateFormActionInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'Submit' }).click();
        await page.getByLabel(`schema-initializer-Grid-FormItemInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: `Display collection fields-${fieldDisplayName}` }).click();

        await page.mouse.move(300, 0);

        // 2、测试步骤：数据区块添加数据触发工作流，禁用工作流，添加数据不触发工作流
        let fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');
        await workflowListRecords.configureAction.click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('switch', { name: 'On Off' }).click();
        // await expect(page.getByRole('switch', { name: 'On Off' })).toBeDisabled();
        await newPage.goto();
        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');

        await workflowListRecords.configureAction.click();
        await page.waitForLoadState('networkidle');
        await page.getByRole('switch', { name: 'On Off' }).click();
        await newPage.goto();
        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(fieldData)).toBeVisible();
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        // 3、预期结果：触发次数为1
        await expect(workflowListRecords.executionCountPopup).toHaveText('2');

        // 4、后置处理：删除工作流
        await workflowListRecords.deleteAction.click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });
});

test.describe('Workflow execution history', () => { });

test.describe('Workflow replication to new versions', () => {
    test('Copy the Form event of the Configuration Trigger node', async ({ page, mockPage }) => {
        //后缀标识，用于不同用例调用e2eTemplateJson.ts中相同模板JSON生成不同的数据表标识、名称
        const appendText = faker.lorem.word(4);
        //用例标题
        const caseTitle = 'Copy the Form event of the Configuration Trigger node';

        // 1、前置条件：1.1、已登录;1.2、存在一个配置好数据表的数据表事件工作流；1.3、存在一个添加数据的区块
        //创建数据表
        const e2eJsonCollectionDisplayName = '自动>组织[普通表]';
        const e2eJsonCollectionName = 'tt_amt_org';

        const collectionDisplayName = e2eJsonCollectionDisplayName + appendText;
        const collectionName = e2eJsonCollectionName + appendText;
        const fieldName = 'orgname';
        const fieldDisplayName = '公司名称(单行文本)';

        //创建数据表
        const newPage = mockPage(appendJsonCollectionName(e2e_GeneralFormsTable, appendText));
        //配置工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        const workflowManagement = new WorkflowManagement(page);
        await workflowManagement.addNewButton.click();
        const createWorkFlow = new CreateWorkFlow(page);
        const workFlowName = caseTitle + appendText;
        await createWorkFlow.name.fill(workFlowName);
        await createWorkFlow.triggerType.click();
        await page.getByTitle('Form event').getByText('Form event').click();
        await createWorkFlow.submitButton.click();
        await expect(page.getByText(workFlowName)).toBeVisible();

        //配置工作流触发器
        const workflowListRecords = new WorkflowListRecords(page, workFlowName);
        await workflowListRecords.configureAction.click();
        const collectionTriggerNode = new CollectionTriggerNode(page, workFlowName, collectionName);
        await collectionTriggerNode.nodeConfigure.click();
        await collectionTriggerNode.collectionDropDown.click();
        await page.getByText(collectionDisplayName).click();
        await collectionTriggerNode.triggerOnDropdown.click();
        await page.getByText('After record added', { exact: true }).click();
        // 设置触发器过滤条件
        await page.getByText('Add condition', { exact: true }).click();
        await page.getByTestId('filter-select-field').getByLabel('Search').click();
        await page.getByText('公司状态(下拉单选)').click();
        await page
            .getByLabel('block-item-Filter-workflows-Only triggers when match conditions')
            .getByTestId('select-single')
            .click();
        await page.getByRole('option', { name: '存续' }).click();

        await collectionTriggerNode.submitButton.click();
        await page.getByRole('link', { name: 'Workflow' }).click();
        await workflowListRecords.editAction.click();
        const editWorkFlow = new EditWorkFlow(page, workFlowName);
        await editWorkFlow.statusIsOn.check();
        await editWorkFlow.submitButton.click();

        //配置录入数据区块
        await newPage.goto();
        await page.waitForLoadState('networkidle');
        await page.getByLabel('schema-initializer-Grid-BlockInitializers').hover();
        await page.getByRole('menuitem', { name: 'table Table' }).hover();
        await page.getByLabel(`dataBlocks-table-${collectionDisplayName}`).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByText('Configure columns').hover();
        await page.getByText(fieldDisplayName).click();
        await page.getByText('Configure actions').hover();
        await page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch').click();
        await expect(page.getByRole('menuitem', { name: 'Add new' }).getByRole('switch')).toBeEnabled();

        await page.getByLabel(`action-Action-Add new-create-${collectionName}-table`).click();
        await page.getByLabel(`schema-initializer-Grid-CreateFormBlockInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'form Form' }).click();

        // 移开鼠标，关闭菜单
        await page.mouse.move(300, 0);

        await page.getByLabel(`schema-initializer-ActionBar-CreateFormActionInitializers-${collectionName}`).hover();
        await page.getByRole('menuitem', { name: 'Submit' }).click();
        await page.getByLabel(`schema-initializer-Grid-FormItemInitializers-${collectionName}`).hover();
        await page.getByRole('button', { name: `Display collection fields-${fieldDisplayName}` }).click();
        await page.getByRole('button', { name: 'Display collection fields-公司状态(下拉单选)' }).click();
        await page.mouse.move(300, 0);

        // 2、测试步骤：进入“数据区块”页面，添加一条数据,再进入工作流配置界面，复制到新版本
        const fieldData = fieldDisplayName + dayjs().format('YYYYMMDDHHmmss.SSS').toString();
        await page.getByRole('textbox').fill(fieldData);
        await page.getByLabel('Search').click();
        await page.getByText('存续').click();
        await page.getByLabel(`action-Action-Submit-submit-${collectionName}-form`, { exact: true }).click();
        await expect(page.getByText(fieldData)).toBeVisible();

        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await expect(workflowListRecords.executionCountPopup).toHaveText('1');

        await workflowListRecords.configureAction.click();
        await page.getByLabel('more').click();
        await page.getByLabel('revision').click();
        await page.waitForLoadState('networkidle');
        await collectionTriggerNode.nodeConfigure.click();
        // 3、预期结果：新版本工作流配置内容同旧版本一样
        await expect(collectionTriggerNode.collectionDropDown).toHaveText(collectionDisplayName);
        await expect(collectionTriggerNode.triggerOnDropdown).toHaveText('After record added');
        await expect(page.getByTestId('filter-select-field')).toHaveText('公司状态(下拉单选)');
        await expect(page.getByTestId('filter-select-operator')).toHaveText('Equal');
        await expect(
            page.getByLabel('block-item-Filter-workflows-Only triggers when match conditions').getByTestId('select-single'),
        ).toHaveText('存续');

        // 4、后置处理：删除工作流
        await page.goto('/admin/settings/workflow');
        await page.waitForLoadState('networkidle');
        await workflowListRecords.deleteAction.click();
        await page.getByRole('button', { name: 'OK', exact: true }).click();
        await expect(page.getByText(workFlowName)).toBeHidden();
    });
});

test.describe('Deleting a version of a workflow', () => { });

test.describe('Workflow node additions and deletions', () => { });