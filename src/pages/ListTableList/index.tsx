import React, { PureComponent } from 'react';
import { Card, Row, Col, Form, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import styles from './index.less';

const { Option } = Select;

const initialState = {
  nodeList: [{ lable: '节点一', value: 1 }],
  typeList: [{ lable: '类型一', value: 1 }],
  activeData: [
    {
      id: 1,
      title: '双十二拼团砍价',
      inTheLasDays: 42,
      Total: 4235,
      recommended: true,
      spellGroup: true,
    },
    {
      id: 2,
      title: '双十二拼团砍价',
      inTheLasDays: 42,
      Total: 4235,
      recommended: true,
      spellGroup: true,
    },
  ],
};

export interface IProps extends FormComponentProps {}

interface IState {
  nodeList: ISelect[];
  typeList: ISelect[];
  activeData: IActiveItem[];
}
interface ISelect {
  lable: string;
  value: string | number;
}
interface IActiveItem {
  id: string | number;
  title: string;
  inTheLasDays: number;
  Total: number;
  recommended: boolean;
  spellGroup: boolean;
}

class TableList extends PureComponent<IProps, IState> {
  readonly state: IState = initialState;

  private handleSearch = () => {};

  private getAllFilter = (filter: any) => {
    const dom =
      filter &&
      filter.map((item: ISelect) => {
        return (
          <Option key={item.value} value={item.value}>
            {item.lable}
          </Option>
        );
      });
    return dom;
  };

  private setSeach = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { nodeList, typeList } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 19 },
        sm: { span: 19 },
      },
    };
    return (
      <Form className={styles.searchRight} layout="horizontal" {...formItemLayout}>
        <Form.Item label="运营节点">
          {getFieldDecorator('node')(
            <Select style={{ width: '160px' }} placeholder="请选择">
              {this.getAllFilter(nodeList)}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="type">
          {getFieldDecorator('模板类型')(
            <Select style={{ width: '160px' }} placeholder="请选择">
              {this.getAllFilter(typeList)}
            </Select>,
          )}
        </Form.Item>
        <Form.Item colon={false}>
          <Button type="primary" className="mr-8 ml-14" onClick={this.handleSearch}>
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  };

  private setActiveCard = () => {
    const { activeData } = this.state;
    const node =
      activeData &&
      activeData.map((item: IActiveItem) => {
        const { id, title, inTheLasDays, Total, recommended, spellGroup } = item;
        return (
          <Card
            key={id}
            hoverable
            style={{ width: 240 }}
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }
          >
            <div className={styles.cardItem}>
              <div>
                <div>{title}</div>
              </div>
              <div>
                <div>{Total}</div>
                <div>{spellGroup && <div>拼团</div>}</div>
              </div>
              <div>
                <div>最近30天：{inTheLasDays}</div>
                <div>
                  <Button type="primary" onClick={this.createActive}>
                    创建活动
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      });
    return node;
  };


  private createActive = () => {
   

  };

  render() {
    return (
      <Row>
        <Col span={24}>
          <Card title={this.setSeach()}>{this.setActiveCard()}</Card>
        </Col>
      </Row>
    );
  }
}

// export default Form.create()(TableList);
export default TableList 
