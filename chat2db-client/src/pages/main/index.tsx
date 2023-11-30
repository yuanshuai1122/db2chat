import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'umi';
import { Dropdown, Tooltip } from 'antd';
import classnames from 'classnames';

import Iconfont from '@/components/Iconfont';
import BrandLogo from '@/components/BrandLogo';

import { findObjListValue } from '@/utils';
import { getUser, userLogout } from '@/service/user';
import { INavItem } from '@/typings/main';
import { ILoginUser, IRole } from '@/typings/user';
import i18n from '@/i18n';

// ----- model -----
import { IMainPageType } from '@/models/mainPage';
import { IWorkspaceModelType } from '@/models/workspace';
import { IConnectionModelType } from '@/models/connection';

// ----- block -----
import Workspace from './workspace';
import Connection from './connection';
import Setting from '@/blocks/Setting';
import styles from './index.less';

const navConfig: INavItem[] = [
  {
    key: 'workspace',
    icon: '\ue616',
    iconFontSize: 16,
    isLoad: false,
    component: <Workspace />,
    name: i18n('workspace.title'),
  },
  {
    key: 'connections',
    icon: '\ue622',
    iconFontSize: 20,
    isLoad: false,
    component: <Connection />,
    name: i18n('connection.title'),
  },
];

interface IProps {
  mainModel: IMainPageType['state'];
  workspaceModel: IWorkspaceModelType['state'];
  connectionModel: IConnectionModelType['state'];
  dispatch: any;
}

function MainPage(props: IProps) {
  const navigate = useNavigate();
  const { mainModel, dispatch } = props;
  const { curPage } = mainModel;
  const [activeNav, setActiveNav] = useState<INavItem | null>(null);
  const [userInfo, setUserInfo] = useState<ILoginUser>();

  useEffect(() => {
    handleInitPage();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'connection/fetchConnectionList',
    });
    dispatch({
      type: 'connection/fetchConnectionEnvList',
    });
  }, []);

  useEffect(() => {
    if (!activeNav) {
      return;
    }
    // activeNav 发生变化，同步到全局状态管理
    activeNav.isLoad = true;
    dispatch({
      type: 'mainPage/updateCurPage',
      payload: activeNav.key,
    });
    // activeNav 发生变化 如果没有选中连接并且不在connections 那么需要跳转到 连接页面
    // if (!curConnection?.id && activeNav.key !== 'connections') {
    //   setActiveNav(navConfig[2]);
    // }
    // activeNav 变化 同步地址栏变化
    // change url，but no page refresh
    // window.history.pushState({}, "", `/#/${activeNav.key}`);
  }, [activeNav]);

  useEffect(() => {
    // 全局状态curPage发生变化，activeNav 需要同步变化
    if (curPage && curPage !== activeNav?.key) {
      const newActiveNav = navConfig[findObjListValue(navConfig, 'key', curPage)];
      setActiveNav(newActiveNav);
    }
    localStorage.setItem('curPage', curPage);
  }, [curPage]);

  const handleInitPage = async () => {
    const res = await getUser();
    if (res) {
      setUserInfo(res);
    }

    const initPage = localStorage.getItem('curPage');
    const initPageIndex = navConfig.findIndex((t) => `${t.key}` === initPage);
    const activeIndex = initPageIndex > -1 ? initPageIndex : 2;
    navConfig[activeIndex].isLoad = true;
    setActiveNav(navConfig[activeIndex]);
  };

  const switchingNav = (item: INavItem) => {
    if (item.openBrowser) {
      window.open(item.openBrowser, '_blank');
    } else {
      setActiveNav(item);
    }
  };

  const handleLogout = () => {
    userLogout().then(() => {
      setUserInfo(undefined);
      navigate('/login');
    });
  };

  const renderUser = () => {
    return (
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: (
                <div className={styles.userDropdown} onClick={handleLogout}>
                  <Iconfont code="&#xe6b2;" />
                  {i18n('login.text.logout')}
                </div>
              ),
            },
          ],
        }}
        placement="bottomRight"
        trigger={['click']}
      >
        <div className={styles.userBox}>
          <Iconfont code="&#xe64c;" className={styles.questionIcon} />
        </div>
      </Dropdown>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.layoutLeft}>
        <BrandLogo size={40} onClick={() => {}} className={styles.brandLogo} />
        <ul className={styles.navList}>
          {navConfig.map((item) => {
            return (
              <Tooltip key={item.key} placement="right" title={item.name}>
                <li
                  className={classnames({
                    [styles.activeNav]: item.key == activeNav?.key,
                  })}
                  onClick={() => switchingNav(item)}
                >
                  <Iconfont
                    style={{ '--icon-size': item.iconFontSize + 'px' } as any}
                    className={styles.icon}
                    code={item.icon}
                  />
                </li>
              </Tooltip>
            );
          })}
        </ul>
        <div className={styles.footer}>
          <Tooltip placement="right" title="个人中心">
            {userInfo?.roleCode !== IRole.DESKTOP ? renderUser() : null}
          </Tooltip>
          <Setting className={styles.setIcon} />
        </div>
      </div>
      <div className={styles.layoutRight}>
        {navConfig.map((item) => {
          return (
            <div key={item.key} className={styles.componentBox} hidden={activeNav?.key !== item.key}>
              {item.isLoad ? item.component : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default connect(
  ({
    mainPage,
    workspace,
    connection,
  }: {
    mainPage: IMainPageType;
    workspace: IWorkspaceModelType;
    connection: IConnectionModelType;
  }) => ({
    mainModel: mainPage,
    workspaceModel: workspace,
    connectionModel: connection,
  }),
)(MainPage);
