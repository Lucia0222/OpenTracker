import React, { useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  message,
  Card,
  Space,
  Row,
  Col,
} from 'antd'
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  UserAddOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { UploadFile, UploadProps } from 'antd'

const { Title } = Typography
const { TextArea } = Input

const UserProfilePage: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 模拟用户初始数据
  const initialUserData = {
    username: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    avatar: '',
    bio: '这是一个用户简介',
    nickname: '系统管理员',
  }

  // 头像上传配置
  const uploadProps: UploadProps = {
    name: 'avatar',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('只支持JPG/PNG格式!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('图片大小必须小于2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    onChange(info: any) {
      if (info.file.status === 'done') {
        // 模拟上传成功，实际项目中应该处理服务器返回的图片URL
        message.success(`${info.file.name} 上传成功`)
        form.setFieldsValue({ avatar: info.file.uid }) // 实际应该设置为服务器返回的URL
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`)
      }
    },
  }

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      // 模拟API调用
      setTimeout(() => {
        console.log('提交的用户数据:', values)
        message.success('个人资料更新成功!')
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('表单验证失败:', error)
      setLoading(false)
    }
  }

  const handleGoHome = () => {
    navigate('/home/dashboard')
  }

  return (
    <div
      style={{
        padding: '24px',
        minHeight: '100vh',
        background: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Space style={{ marginBottom: 24, width: '100%', maxWidth: 800, textAlign: 'left' }}>
        <Button type="primary" icon={<HomeOutlined />} onClick={handleGoHome}>
          返回首页
        </Button>
      </Space>

      <Title
        level={2}
        style={{ width: '100%', maxWidth: 800, textAlign: 'center', marginBottom: 32 }}
      >
        个人中心
      </Title>

      <Card style={{ maxWidth: 800, width: '100%' }}>
        <Form form={form} layout="vertical" initialValues={initialUserData}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Upload {...uploadProps}>
                  <Avatar
                    size={120}
                    icon={<UserOutlined />}
                    src={form.getFieldValue('avatar') || undefined}
                    style={{ cursor: 'pointer', marginBottom: 16 }}
                  />
                  <div>点击上传头像</div>
                </Upload>
              </div>
            </Col>

            <Col xs={24} md={18}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                      { required: true, message: '请输入用户名' },
                      { max: 20, message: '用户名长度不能超过20个字符' },
                    ]}
                    hasFeedback
                  >
                    <Input prefix={<UserAddOutlined />} placeholder="请输入用户名" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="nickname"
                    label="昵称"
                    rules={[{ max: 20, message: '昵称长度不能超过20个字符' }]}
                  >
                    <Input placeholder="请输入昵称（选填）" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                      { required: true, message: '请输入邮箱地址' },
                      { type: 'email', message: '请输入有效的邮箱地址' },
                    ]}
                    hasFeedback
                  >
                    <Input prefix={<MailOutlined />} placeholder="请输入邮箱地址" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' },
                    ]}
                    hasFeedback
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    name="bio"
                    label="个人简介"
                    rules={[{ max: 200, message: '个人简介长度不能超过200个字符' }]}
                  >
                    <TextArea rows={4} placeholder="请输入个人简介（选填）" />
                  </Form.Item>
                </Col>

                <Col xs={24} style={{ textAlign: 'right' }}>
                  <Space>
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        icon={<SaveOutlined />}
                      >
                        保存更改
                      </Button>
                    </Form.Item>

                    <Form.Item>
                      <Button onClick={() => form.resetFields()}>取消</Button>
                    </Form.Item>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default UserProfilePage
