import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, Col, message, Form, Row, Input, Table } from 'antd'
import * as userActions from '../../redux/actions/sys/user'

const SysUserView = ({
                        sysUser,
                        location,
                        form: {
                          getFieldDecorator,
                          getFieldsValue,
                        },
                        ...others
                      }) => {
  const { filterProps, pagination, loading, list: dataSource, initLoaded } = sysUser

  const { queryList } = others

  !initLoaded && queryList({ payload: {} })

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields.pageSize = pagination.pageSize
    fields.pageNo = 1
    if (!fields.userId || fields.userId == null || fields.userId.length <= 0) {
      fields.userId = 'all'
    }
    queryList({ payload: fields })
  }

  const handleExport = () => {
    filterProps.expType = 'csv'
    const url = ''
    document.location.href = url
    message.loading('正在下载...', 2)
  }

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Gender',
      dataIndex: 'isMale',
      key: 'isMale',
      render: (text) => <span>{text
        ? 'Male'
        : 'Female'}</span>,
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'CreateTime',
      dataIndex: 'createTime',
      key: 'createTime',
    },]

  const listProps = {
    pagination: { ...pagination, showSizeChanger: true, showQuickJumper: true },
    columns,
    onChange (page) {
      queryList({ payload: {
        ...filterProps,
        pageNo: page.current,
        pageSize: page.pageSize,
      } })
    },
  }

  const ColProps = {
    // xs={20} sm={16} md={12} lg={8} xl={4}
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 8,
    style: {
      marginBottom: 16,
    },
  }
  return (
    <div className="content-inner">
      <Row gutter={24}>
        <Col {...ColProps}>
          {getFieldDecorator('liveId', { initialValue: '' })(
            <Input size="large" style={{ width: '100%' }} placeholder="请输入直播ID" />
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 6 }} sm={{ span: 12 }}>
          {getFieldDecorator('userId', { })(
            <Input size="large" style={{ width: '100%' }} placeholder="请输入用户ID" />
          )}
        </Col>
        <Col {...ColProps}>
          <Button type="primary" icon="search" size="large" loading={loading} className="margin-right" onClick={handleSubmit}>查询</Button>
          <Button type="info" icon="download" size="large" className="margin-right" onClick={handleExport}>导出</Button>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Table loading={loading} dataSource={dataSource} {...listProps} />
        </Col>
      </Row>
    </div>
  )
}
SysUserView.propTypes = {
  sysUser: PropTypes.object,
  location: PropTypes.object,
  form: React.PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ sysUser }) => ({ sysUser }), userActions)(Form.create()(SysUserView))
