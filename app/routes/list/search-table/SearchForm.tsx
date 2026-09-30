import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Form, Input, Select, DatePicker, Button, Grid } from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { useTranslation } from 'react-i18next';
import { ContentType, FilterType, Status } from './constants';
import styles from './style.module.styl';
import { SearchFormProps } from './types';

const { Row, Col } = Grid;
const { useForm } = Form;

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { t, i18n } = useTranslation();
  const [form] = useForm();

  const colSpan = i18n.language === 'zh-CN' ? 8 : 12;

  const handleSubmit = () => {
    onSearch(form.getFieldsValue());
  };

  const handleReset = () => {
    form.resetFields();
    onSearch({});
  };

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.id')} field="id">
              <Input placeholder={t('searchForm.id.placeholder')} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.name')} field="name">
              <Input placeholder={t('searchForm.name.placeholder')} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.contentType')} field="contentType">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={ContentType.map((item, index) => ({ label: item, value: index }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.filterType')} field="filterType">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={FilterType.map((item, index) => ({ label: item, value: index }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.createdTime')} field="createdTime">
              <DatePicker.RangePicker
                allowClear
                style={{ width: '100%' }}
                disabledDate={(current: Dayjs) => current.isAfter(dayjs())}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.status')} field="status">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={Status.map((item, index) => ({ label: item, value: index }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
          {t('searchTable.form.search')}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t('searchTable.form.reset')}
        </Button>
      </div>
    </div>
  );
}
