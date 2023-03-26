import i18n from '@/i18n'
const t = i18n.global.t
export default () => [
  {
    label: t('msg.userManage.avatar'),
    prop: 'avatar',
    width: '90px'
  },
  {
    label: t('msg.userManage.role'),
    prop: 'authId',
    width: '90px'
  },
  {
    label: t('msg.userManage.account'),
    prop: 'account',
    width: '90px'
  },
  {
    label: t('msg.userManage.nickname'),
    prop: 'nickName'
  },
  {
    label: t('msg.userManage.age'),
    prop: 'age'
  },
  {
    label: t('msg.userManage.city'),
    prop: 'city'
  },
  {
    label: t('msg.userManage.gender'),
    prop: 'gender',
    width: '90px'
  },
  {
    label: t('msg.userManage.idcard'),
    prop: 'idcard',
    width: '180px'
  },
  {
    label: t('msg.userManage.intriduce'),
    prop: 'intriduce',
    width: '300px'
  },
  {
    label: t('msg.userManage.email'),
    prop: 'email',
    width: '200px'
  },
  {
    label: t('msg.userManage.state'),
    prop: 'state'
  },
  {
    label: t('msg.userManage.createdAtFormat'),
    prop: 'createdAtFormat',
    width: '160px'
  },
  {
    label: t('msg.userManage.updateAtFormat'),
    prop: 'updateAtFormat',
    width: '110px'
  },
  {
    label: t('msg.userManage.action'),
    prop: 'action',
    fixed: 'right',
    width: '190px'
  }
]
